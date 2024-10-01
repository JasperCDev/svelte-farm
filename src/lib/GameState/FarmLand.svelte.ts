import type { TilePiece, TilePiecePos, ZeroThruFour } from "../components/Game/CTiles.svelte";
import { derive } from "../utils";
import type { GridObject } from "./GridObject.svelte";
import { PlantBasic } from "./PlantBasic.svelte";
import { Shop } from "./Shop.svelte";
import { Tile, type TileType } from "./Tile.svelte";
import { ToolMover } from "./ToolMover.svelte";
import type { Point, Tool } from "./types";

export class FarmLand {
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

    constructor() {
        this.getGridSize();
        this.initTilePieces();
        this.placeObject(new Shop(10, 10));
        this.placeObject(new ToolMover(14, 12));
        this.placeObject(new PlantBasic(1, 1));

        this.handleGridClick = this.handleGridClick.bind(this);
        this.handleGridMouseMove = this.handleGridMouseMove.bind(this);
        this.handleGridMouseDown = this.handleGridMouseDown.bind(this);
        this.handleGridMouseUp = this.handleGridMouseUp.bind(this);
    }

    public handleGridMouseDown(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.isMouseDown = true;
        let point = this.getPointFromMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
        const clickedGridObject = this.getGridObjectFromPoint(point);
        this.selectedGridObjectId = clickedGridObject?.id || null;
    }

    public handleGridMouseUp(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.isMouseDown = false;
        if (!this.isDragging || this.selectedGridObjectId === null) {
            return;
        }
        let selectedGridObjectIterator = FarmLand.getIteratorFromId(farmLand.selectedGridObjectId!);
        let selectedGridObject = farmLand.gridObjects[selectedGridObjectIterator]!;
        this.placeObject(selectedGridObject);
        selectedGridObject.invalidPlacement = false;
        farmLand.selectedGridObjectId = null;
        this.stopDrag();
    }

    private stopDrag() {
        // hacky trick to prevent a drag triggering a click
        requestAnimationFrame(() => (this.isDragging = false));
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
            let tile = this.tiles[FarmLand.getIteratorFromId(FarmLand.getIdFromPoint(square))];
            this.updateTileType(tile, "GRASS");
        }
        if (this.isDragging && !gridObject.invalidPlacement) {
            gridObject.row = gridObject.draggedRow;
            gridObject.col = gridObject.draggedCol;
            gridObject.space.squares = gridObject.space.draggedSquares;
        }
        this.gridObjects[
            FarmLand.getIteratorFromId(
                FarmLand.getIdFromPoint({ row: gridObject.row, col: gridObject.col }),
            )
        ] = gridObject;
        if (this.isDragging && !gridObject.invalidPlacement) {
            this.gridObjects[
                FarmLand.getIteratorFromId(
                    FarmLand.getIdFromPoint({ row: gridObject.row, col: gridObject.col }),
                )
            ] = undefined; // clear old space
        }
    }

    public getCorrespondingTilePieces(tile: Tile) {
        let tileIndex = FarmLand.getIteratorFromId(
            FarmLand.getIdFromPoint({ row: tile.row, col: tile.col }),
        );
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
        console.log("click");
        let point = this.getPointFromMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
        const clickedGridObject = this.getGridObjectFromPoint(point);
        if (typeof clickedGridObject !== "undefined") {
            clickedGridObject.handleClick();
            return;
        }
        let tileIndx = FarmLand.getIteratorFromPoint(point);
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
        if (!this.isMouseDown) {
            return;
        }
        if (this.isDragging) {
            this.snapObject(e);
            return;
        }
        if (this.selectedGridObjectId === null) {
            return;
        }
        let selectedGridObject =
            this.gridObjects[FarmLand.getIteratorFromId(this.selectedGridObjectId)]!;
        let point = this.getPointFromMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
        const isDifferentPoint =
            point.row != selectedGridObject.row || point.col !== selectedGridObject.col;
        if (isDifferentPoint) {
            this.isDragging = true;
            this.snapObject(e);
            return;
        }
    }

    public snapObject(e: MouseEvent) {
        if (this.selectedGridObjectId === null) {
            return;
        }
        let selectedGridObjectIterator = FarmLand.getIteratorFromId(farmLand.selectedGridObjectId!);
        let selectedGridObject = farmLand.gridObjects[selectedGridObjectIterator]!;
        let { row, col } = this.getPointFromMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
        let rowDiff = row - selectedGridObject.space.squares[0].row;
        let colDiff = col - selectedGridObject.space.squares[0].col;
        let newSquares = selectedGridObject.space.squares.map((s) => {
            return {
                row: s.row + rowDiff,
                col: s.col + colDiff,
            };
        });
        let isOutOfBounds = false;
        let rowBoundsDiff = 0;
        let colBoundsDiff = 0;
        for (let square of newSquares) {
            if (square.row > FarmLand.ROW_COUNT) {
                rowBoundsDiff = Math.max(colBoundsDiff, square.row - FarmLand.ROW_COUNT);
                isOutOfBounds = true;
            }
            if (square.col > FarmLand.COL_COUNT) {
                colBoundsDiff = Math.max(rowBoundsDiff, square.col - FarmLand.COL_COUNT);
                isOutOfBounds = true;
            }
        }
        if (isOutOfBounds) {
            row -= rowBoundsDiff;
            col -= colBoundsDiff;
            for (let square of newSquares) {
                square.row -= rowBoundsDiff;
                square.col -= colBoundsDiff;
            }
        }
        let isOverlapping = derive(() => {
            for (let gridObj of farmLand.gridObjects) {
                if (typeof gridObj === "undefined") {
                    continue;
                }
                if (gridObj.id === selectedGridObject.id) {
                    continue;
                }
                for (let sqaure1 of gridObj.space.squares) {
                    for (let square2 of newSquares) {
                        let isSameSpace =
                            sqaure1.col === square2.col && sqaure1.row === square2.row;
                        if (isSameSpace) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
        selectedGridObject.invalidPlacement = isOverlapping;
        selectedGridObject.draggedRow = row;
        selectedGridObject.draggedCol = col;
        selectedGridObject.space.draggedSquares = newSquares;
    }

    public getGridSize() {
        let widthPercent = window.innerWidth / 16000000;
        let heightPercent = window.innerHeight / 9000000;
        let smallestPercent = Math.min(widthPercent, heightPercent);
        this.gridWidth = Math.round(16000000 * smallestPercent);
        this.gridHeight = Math.round(9000000 * smallestPercent);
        this.tileSize = this.gridHeight / FarmLand.ROW_COUNT;
    }

    static getPointFromIterator(i: number) {
        let n = i + 1;
        let row = Math.ceil(n / FarmLand.COL_COUNT);
        let col = n % FarmLand.COL_COUNT || FarmLand.COL_COUNT;
        return { row, col };
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

    static getIteratorFromId(id: string) {
        let split = id.split("-");
        let rowCount = parseInt(split[0]);
        let colCount = parseInt(split[1]);
        return FarmLand.COL_COUNT * (rowCount - 1) + colCount - 1;
    }

    static getIteratorFromPoint(point: Point) {
        return FarmLand.getIteratorFromId(FarmLand.getIdFromPoint(point));
    }

    static getIdFromPoint(point: Point) {
        FarmLand.idHelper++;
        return point.row.toString().padStart(2, "0") + "-" + point.col.toString().padStart(2, "0");
    }
}
export let farmLand = new FarmLand();
