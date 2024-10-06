import type { TilePiece, TilePiecePos, ZeroThruFour } from "../components/Game/CTiles.svelte";
import { derive } from "../utils";
import { Component } from "./Component.svelte";
import { Currency } from "./Currency.svelte";
import { CurrencyBlock } from "./CurrencyBlock.svelte";
import { GridObject } from "./GridObject.svelte";
import { PlantBasic } from "./PlantBasic.svelte";
import { Shop } from "./Shop.svelte";
import { Tile, type TileType } from "./Tile.svelte";
import { Time } from "./Time.svelte";
import { TimeBlock } from "./TimeBlock.svelte";
import { ToolHoe } from "./ToolHoe.svelte";
import { ToolWateringCan } from "./ToolWateringCan.svelte";
import type { Point, Tool } from "./types";
import { Weather } from "./Weather.svelte";

export class FarmLand extends Component {
    static idHelper = 0;
    static TIME_SPEED = 500;
    static ROW_COUNT = 18;
    static COL_COUNT = 32;
    public tiles = Array.from(
        { length: FarmLand.COL_COUNT * FarmLand.ROW_COUNT },
        (_, i) => new Tile(i),
    );

    public gridObjects = $state<Array<GridObject | undefined>>(
        Array.from({
            length: FarmLand.COL_COUNT * FarmLand.ROW_COUNT,
        }),
    );

    public tilePieces = $state(
        Array.from<object, TilePiece>(
            { length: (FarmLand.COL_COUNT + 1) * (FarmLand.ROW_COUNT + 1) },
            (_, i) => ({
                point: {
                    row: Math.ceil((i + 1) / (FarmLand.COL_COUNT + 1)),
                    col: (i + 1) % (FarmLand.COL_COUNT + 1) || FarmLand.COL_COUNT + 1,
                },
                topLeft: null,
                topRight: null,
                bottomLeft: null,
                bottomRight: null,
                typeCounts: {
                    GRASS: 0 as ZeroThruFour,
                    SOIL: 0 as ZeroThruFour,
                    WATER: 0 as ZeroThruFour,
                },
            }),
        ),
    );

    public tileSize = $state<number>(0);
    public gridWidth = $state<number>(0);
    public gridHeight = $state<number>(0);

    public selectedGridObjectId = $state<string | null>(null);
    public selectedTool = $state<Tool>("cursor");
    public isDragging = $state<boolean>(false);
    public isMouseDown = $state<boolean>(false);
    public mousePosition = $state<Point>({ row: 1, col: 1 });
    private _mousePositionFromEvent = { row: 1, col: 1 };
    public recentMouseDownPosition = $state<Point>({ row: 1, col: 1 });
    public isDragEnd = $state<boolean>(false);

    public time = new Time();
    public currency = new Currency();
    public weather = new Weather();

    constructor() {
        super();
        this.getGridSize();
        this.initTilePieces();
        this.placeObject(new Shop(10, 10));
        this.placeObject(new TimeBlock(1, 29));
        this.placeObject(new ToolHoe(15, 20));
        this.placeObject(new ToolWateringCan(13, 14));
        this.placeObject(new CurrencyBlock(18, 29));

        this.placeObject(new PlantBasic(1, 1));
        this.placeObject(new PlantBasic(1, 2));
        this.placeObject(new PlantBasic(1, 3));
        this.placeObject(new PlantBasic(1, 4));
        this.placeObject(new PlantBasic(1, 5));
        this.placeObject(new PlantBasic(1, 6));
        this.placeObject(new PlantBasic(1, 7));

        this.updateTileType(this.tiles[0], "SOIL");
        this.updateTileType(this.tiles[1], "SOIL");
        this.updateTileType(this.tiles[2], "SOIL");
        this.updateTileType(this.tiles[3], "SOIL");
        this.updateTileType(this.tiles[4], "SOIL");
        this.updateTileType(this.tiles[5], "SOIL");
        this.updateTileType(this.tiles[6], "SOIL");

        this.handleGridClick = this.handleGridClick.bind(this);
        this.handleGridMouseMove = this.handleGridMouseMove.bind(this);
        this.handleGridMouseDown = this.handleGridMouseDown.bind(this);
        this.handleGridMouseUp = this.handleGridMouseUp.bind(this);
    }

    update(timestamp: number): void {
        this.mousePosition = this._mousePositionFromEvent;
        this.time.update(timestamp);
        this.currency.update(timestamp);
        this.weather.update(timestamp);
        for (let gridObject of this.gridObjects) {
            if (typeof gridObject === "undefined") {
                continue;
            }
            gridObject.update(timestamp);
        }
        for (let tile of this.tiles) {
            tile.update(timestamp);
        }
    }

    public handleGridMouseDown(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.recentMouseDownPosition = this.getPointFromMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
        this.isMouseDown = true;
        const clickedGridObject = this.getGridObjectFromPoint(this.recentMouseDownPosition);
        this.selectedGridObjectId = clickedGridObject?.id || null;
    }

    public handleGridMouseUp(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.isMouseDown = false;
        if (!this.isDragging || this.selectedGridObjectId === null) {
            return;
        }
        this.stopDrag();
    }

    public stopDrag() {
        this.isDragEnd = true;
        // hacky trick to prevent a drag triggering a click
        requestAnimationFrame(() => {
            this.isDragging = false;
            farmLand.selectedGridObjectId = null;
        });
    }

    public initTilePieces() {
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            let { topLeft, topRight, bottomRight, bottomLeft } =
                this.getCorrespondingTilePieces(tile);
            topLeft.bottomRight = tile.type;
            topRight.bottomLeft = tile.type;
            bottomLeft.topRight = tile.type;
            bottomRight.topLeft = tile.type;
            topLeft.typeCounts[tile.type]++;
            topRight.typeCounts[tile.type]++;
            bottomRight.typeCounts[tile.type]++;
            bottomLeft.typeCounts[tile.type]++;
        }
    }

    public updateTileType(tile: Tile, type: TileType) {
        let { topLeft, topRight, bottomRight, bottomLeft } = this.getCorrespondingTilePieces(tile);
        topLeft.bottomRight = type;
        topRight.bottomLeft = type;
        bottomLeft.topRight = type;
        bottomRight.topLeft = type;
        topLeft.typeCounts[tile.type]--;
        topRight.typeCounts[tile.type]--;
        bottomRight.typeCounts[tile.type]--;
        bottomLeft.typeCounts[tile.type]--;
        topLeft.typeCounts[type]++;
        topRight.typeCounts[type]++;
        bottomRight.typeCounts[type]++;
        bottomLeft.typeCounts[type]++;
        tile.type = type;
    }

    public placeObject(gridObject: GridObject) {
        for (let i = 0; i < gridObject.space.squares.length; i++) {
            let square = gridObject.space.squares[i];
            let tile = this.tiles[Tile.getIteratorFromPoint(square)];
            this.updateTileType(tile, "GRASS");
        }
        const pos = GridObject.getIteratorFromPoint({
            row: gridObject.row,
            col: gridObject.col,
        });
        this.gridObjects[pos] = gridObject;
    }

    public getCorrespondingTilePieces(tile: Tile) {
        let tileIndex = Tile.getIteratorFromPoint({ row: tile.row, col: tile.col });
        let topLeftIndx = tileIndex + (tile.row - 1);
        let topRightIndx = topLeftIndx + 1;
        let bottomLeftIndx = tile.row * (FarmLand.COL_COUNT + 1) - 1 + tile.col;
        let bottomRightIndx = bottomLeftIndx + 1;
        return {
            topLeft: this.tilePieces[topLeftIndx],
            topRight: this.tilePieces[topRightIndx],
            bottomRight: this.tilePieces[bottomRightIndx],
            bottomLeft: this.tilePieces[bottomLeftIndx],
        };
    }

    public handleGridClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (this.isDragging) {
            return;
        }
        let point = this.getPointFromMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
        const clickedGridObject = this.getGridObjectFromPoint(point);
        if (typeof clickedGridObject !== "undefined") {
            clickedGridObject.handleClick();
            return;
        }
        let tileIndx = Tile.getIteratorFromPoint(point);
        let tile = this.tiles[tileIndx];
        tile.handleClick();
    }

    private getGridObjectFromPoint(point: Point): GridObject | undefined {
        for (let gridObject of this.gridObjects) {
            if (typeof gridObject === "undefined") {
                continue;
            }
            let squareFoundIndx = gridObject.space.squares.findIndex((square) => {
                return square.row === point.row && square.col === point.col;
            });
            if (squareFoundIndx !== -1) {
                return gridObject;
            }
        }
    }

    public handleGridMouseMove(e: MouseEvent) {
        this._mousePositionFromEvent = this.getPointFromMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
        if (!this.isMouseDown) {
            return;
        }
        if (this.selectedGridObjectId === null) {
            return;
        }
        if (this.isDragging) {
            return;
        }
        const isDifferentPoint =
            this._mousePositionFromEvent.row !== this.recentMouseDownPosition.row ||
            this._mousePositionFromEvent.col !== this.recentMouseDownPosition.col;
        if (isDifferentPoint) {
            this.isDragging = true;
            return;
        }
    }

    public getGridSize() {
        let widthPercent = window.innerWidth / 16000000;
        let heightPercent = window.innerHeight / 9000000;
        let smallestPercent = Math.min(widthPercent, heightPercent);
        this.gridWidth = Math.round(16000000 * smallestPercent);
        this.gridHeight = Math.round(9000000 * smallestPercent);
        this.tileSize = this.gridHeight / FarmLand.ROW_COUNT;
    }

    public getPointFromMousePosition(mousePos: { x: number; y: number }) {
        // x & y mouse position relative to the window
        let relX = mousePos.x - (window.innerWidth - this.gridWidth) / 2;
        let relY = mousePos.y - (window.innerHeight - this.gridHeight) / 2;

        // x & y remander from tilesize
        let modX = relX % this.tileSize;
        let modY = relY % this.tileSize;

        // x & y snapped to grid
        let snappedX = relX - modX;
        let snappedY = relY - modY;

        // row & col rounded from the tile count of x & y + 1
        return {
            row: Math.round(snappedY / this.tileSize + 1),
            col: Math.round(snappedX / this.tileSize + 1),
        };
    }
}
export let farmLand = new FarmLand();

function update(timestamp: number) {
    farmLand.update(timestamp);
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
