import { FarmLand, farmLand } from "./FarmLand.svelte";
import type { Points } from "./types";
import { GRID_OBJECT_MAP } from "../components/Game/CGrid.svelte";

export type GridObjectName = keyof typeof GRID_OBJECT_MAP;

export class GridObjectSpace {
    width = $state<number>();
    height = $state<number>();
    squares = $state<Points>()!;
    constructor(width: number, height: number, squares: Points) {
        this.width = width;
        this.height = height;
        this.squares = squares;
    }
}

export class GridObject {
    row = $state<number>()!;
    col = $state<number>()!;
    name = $state<GridObjectName>()!;
    space = $state<GridObjectSpace>()!;
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
        this.row = row;
        this.col = col;
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
        if (farmLand.interactionMode === "placing") {
            return;
        }
        switch (farmLand.selectedTool) {
            case "cursor":
                this.onClick();
                return;
            case "mover":
                if (!this.movable) {
                    return;
                }
                farmLand.interactionMode = "placing";
                farmLand.selectedGridObjectId = this.id;
                return;
            default:
                let exhaustive: never = farmLand.selectedTool;
        }
    }
}
