import type { TilePiece, TilePiecePos, ZeroThruFour } from "../components/Game/CTiles.svelte";
import { derive } from "../utils";
import type { GridObject } from "./GridObject.svelte";
import { Plant } from "./Plant.svelte";
import { Shop } from "./Shop.svelte";
import { Tile } from "./Tile.svelte";
import { Toolbar, type Tool } from "./Toolbar.svelte";
import type { Point } from "./types";

export class FarmLand {
    static idHelper = 0;
    static TIME_SPEED = 500;
    static ROW_COUNT = 18;
    static COL_COUNT = 32;
    public tiles = $state<Array<Tile>>(
        Array.from({ length: FarmLand.COL_COUNT * FarmLand.ROW_COUNT }, (_, i) => new Tile(i)),
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

    public interactionMode = $state<"cursor" | "placing">("cursor");
    public selectedGridObjectId = $state<string | null>(null);
    public selectedTool = $state<Tool>("cursor");
    constructor() {
        this.getGridSize();
        this.initTilePieces();
        this.placeObject(new Plant(1, 1, "basic"));
        this.placeObject(
            new Shop(10, 10, [
                { row: 10, col: 10 },
                { row: 10, col: 11 },
                { row: 10, col: 12 },
                { row: 11, col: 10 },
                { row: 11, col: 11 },
                { row: 11, col: 12 },
                { row: 12, col: 10 },
                { row: 12, col: 11 },
                { row: 12, col: 12 },
            ]),
        );
        this.placeObject(
            new Toolbar(17, 15, [
                { row: 17, col: 15 },
                { row: 17, col: 16 },
                { row: 17, col: 17 },
                { row: 17, col: 18 },
                { row: 18, col: 15 },
                { row: 18, col: 16 },
                { row: 18, col: 17 },
                { row: 18, col: 18 },
            ]),
        );
        this.placeObject(new Plant(5, 10, "bush"));

        this.handleGridClick = this.handleGridClick.bind(this);
        this.handleGridMouseMove = this.handleGridMouseMove.bind(this);
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

    public placeObject(gridObject: GridObject) {
        for (let i = 0; i < gridObject.space.squares.length; i++) {
            let square = gridObject.space.squares[i];
            let tile = this.tiles[FarmLand.getIteratorFromId(FarmLand.getIdFromPoint(square))];
            let { topLeft, topRight, bottomRight, bottomLeft } =
                this.getCorrespondingTilePieces(tile);
            topLeft.bottomRight = "GRASS";
            topRight.bottomLeft = "GRASS";
            bottomLeft.topRight = "GRASS";
            bottomRight.topLeft = "GRASS";
            topLeft.typeCounts[tile.type]--;
            topRight.typeCounts[tile.type]--;
            bottomRight.typeCounts[tile.type]--;
            bottomLeft.typeCounts[tile.type]--;
            topLeft.typeCounts["GRASS"]++;
            topRight.typeCounts["GRASS"]++;
            bottomRight.typeCounts["GRASS"]++;
            bottomLeft.typeCounts["GRASS"]++;
            tile.type = "GRASS";
        }
        this.gridObjects[
            FarmLand.getIteratorFromId(
                FarmLand.getIdFromPoint({ row: gridObject.row, col: gridObject.col }),
            )
        ] = gridObject;
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
        if (farmLand.interactionMode == "placing") {
            let selectedGridObjectIterator = FarmLand.getIteratorFromId(
                farmLand.selectedGridObjectId!,
            );
            let selectedGridObject = farmLand.gridObjects[selectedGridObjectIterator]!;
            if (selectedGridObject.invalidPlacement) {
                return;
            }
            farmLand.interactionMode = "cursor";
            selectedGridObject.invalidPlacement = false;
            farmLand.selectedGridObjectId = null;
            this.placeObject(selectedGridObject);
            return;
        }

        let { row, col } = this.getPointFromMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
        for (let gridObject of this.gridObjects) {
            if (typeof gridObject === "undefined") {
                continue;
            }
            let squareFoundIndx = gridObject.space.squares.findIndex((point) => {
                return point.row === row && point.col === col;
            });
            let isHit = squareFoundIndx !== -1;
            if (isHit) {
                gridObject.handleClick();
                return;
            }
        }
        let tileIndx = FarmLand.getIteratorFromPoint({ row, col });
        let tile = this.tiles[tileIndx];
        tile.handleClick();
    }

    public handleGridMouseMove(e: MouseEvent) {
        if (farmLand.interactionMode !== "placing") {
            return;
        }
        if (farmLand.selectedGridObjectId === null) {
            return;
        }
        this.snapObject(e);
    }

    public snapObject(e: MouseEvent) {
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
        if (isOverlapping) {
            selectedGridObject.invalidPlacement = true;
            selectedGridObject.invalidPlacement = isOverlapping;
            selectedGridObject.row = row;
            selectedGridObject.col = col;
            selectedGridObject.space.squares = newSquares;
            return;
        }
        for (let square of newSquares) {
            let tileId = FarmLand.getIteratorFromPoint(square);
            let tile = farmLand.tiles[tileId];
            // if (tile.type !== "GRASS") {
            //     selectedGridObject.invalidPlacement = true;
            //     selectedGridObject.row = row;
            //     selectedGridObject.col = col;
            //     selectedGridObject.space.squares = newSquares;
            //     return;
            // }
        }
        selectedGridObject.invalidPlacement = isOverlapping;
        selectedGridObject.row = row;
        selectedGridObject.col = col;
        selectedGridObject.space.squares = newSquares;
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
