import { FarmLand, farmLand } from "./FarmLand.svelte";
import type { Points } from "./types";
import { GRID_OBJECT_MAP } from "../components/Game/CGrid.svelte";

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

export class GridObject {
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

    constructor(
        row: number,
        col: number,
        name: GridObjectName,
        width: number,
        height: number,
        squares?: Points,
        movable?: boolean,
    ) {
        console.log(row, col);
        this.row = row;
        this.col = col;
        this.draggedRow = row;
        this.draggedCol = col;
        let translatedSquares = this._getTranslatedSqaures(squares || [{ row, col }]);
        this.space = new GridObjectSpace(width, height, translatedSquares);
        this.name = name;
        this.id = FarmLand.getIdFromPoint({ row, col });
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
        switch (farmLand.selectedTool) {
            case "cursor":
                this.onClick();
                return;
            default:
                let exhaustive: never = farmLand.selectedTool;
        }
    }
}
