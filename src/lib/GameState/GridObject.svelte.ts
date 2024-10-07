import { FarmLand, farmLand } from "./FarmLand.svelte";
import type { Point, Points } from "./types";
import { GRID_OBJECT_MAP } from "../components/Game/CGrid.svelte";
import { Component } from "./Component.svelte";
import { derive } from "../utils";
import { Tile, type TileType } from "./Tile.svelte";

export type GridObjectName = keyof typeof GRID_OBJECT_MAP;

export class GridObjectSpace {
    width = $state<number>();
    height = $state<number>();
    squares = $state<Points>()!;
    draggedSquares = $state<Points>()!;
    constructor(width: number, height: number, squares: Points) {
        this.width = width;
        this.height = height;
        this.squares = squares;
        this.draggedSquares = squares;
    }
}

export class GridObject extends Component {
    static idHelper = 0;
    static duplicating = false;
    row = $state<number>()!;
    col = $state<number>()!;
    space = $state<GridObjectSpace>()!;
    draggedRow = $state<number>()!;
    draggedCol = $state<number>()!;
    name = $state<GridObjectName>()!;
    id = $state<string>()!;
    placing = $state<boolean>(false);
    movable = $state<boolean>(false);
    invalidPlacement = $state<boolean>(false);

    validTiles: Array<TileType> = ["GRASS", "SOIL", "WATER"];

    constructor(
        row: number,
        col: number,
        name: GridObjectName,
        width: number,
        height: number,
        squares?: Points,
        movable?: boolean,
    ) {
        super();
        this.row = row;
        this.col = col;
        this.draggedRow = row;
        this.draggedCol = col;
        let translatedSquares = this._getTranslatedSqaures(squares || [{ row, col }]);
        this.space = new GridObjectSpace(width, height, translatedSquares);
        this.name = name;
        this.id = (++FarmLand.idHelper).toString();
        this.movable = Boolean(movable);
    }

    private _getTranslatedSqaures(squares: Points) {
        let rowDiff = this.row - squares[0].row;
        let colDiff = this.col - squares[0].col;
        return squares.map((s) => {
            return {
                row: s.row + rowDiff,
                col: s.col + colDiff,
            };
        });
    }

    onClick() {
        /** */
    }

    handleClick() {
        this.onClick();
    }

    private _snapToGrid() {
        let { row, col } = farmLand.mousePosition;
        let rowDiff = row - this.space.squares[0].row;
        let colDiff = col - this.space.squares[0].col;
        let newSquares = this.space.squares.map((s) => {
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
                if (gridObj.id === this.id) {
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

        let isTileValid = derive(() => {
            for (let square of newSquares) {
                let tile = Tile.getTileByPoint({ row, col });
                if (!this.validTiles.includes(tile.type)) {
                    return false;
                }
            }
            return true;
        });

        this.invalidPlacement = isOverlapping || !isTileValid;
        this.draggedRow = row;
        this.draggedCol = col;
        this.space.draggedSquares = newSquares;
    }

    private _move() {
        if (this.invalidPlacement) {
            return;
        }
        const posOld = GridObject.getIteratorFromPoint({
            row: this.row,
            col: this.col,
        });
        const posNew = GridObject.getIteratorFromPoint({
            row: this.draggedRow,
            col: this.draggedCol,
        });
        this.row = this.draggedRow;
        this.col = this.draggedCol;
        this.space.squares = this.space.draggedSquares;
        let isNewPosition = posOld !== posNew;
        if (isNewPosition) {
            farmLand.gridObjects[posNew] = this;
            farmLand.gridObjects[posOld] = undefined; // Delete from old position
        }
        return;
    }

    duplicate() {}

    duplicateEnd() {}

    update(timestamp: number): void {
        if (farmLand.isDragging && farmLand.selectedGridObjectId === this.id) {
            if (farmLand.selectedTool === "duplicate" && !GridObject.duplicating) {
                this.duplicate();
            } else {
                this._snapToGrid();
            }
        }
        if (farmLand.isDragEnd && farmLand.selectedGridObjectId === this.id) {
            this._move();
            this.invalidPlacement = false;
            farmLand.isDragEnd = false;
            if (GridObject.duplicating) {
                this.duplicateEnd();
            }
        }
    }

    static kill(point: Point) {
        let i = GridObject.getIteratorFromPoint(point);
        farmLand.gridObjects[i] = undefined;
    }

    static getIteratorFromPoint(point: Point) {
        return (point.row - 1) * FarmLand.COL_COUNT + point.col - 1;
    }
}
