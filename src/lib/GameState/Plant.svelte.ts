import { GridObject, type GridObjectName } from "./GridObject.svelte";
import type { Points } from "./types";

export class Plant extends GridObject {
    constructor(
        row: number,
        col: number,
        name: GridObjectName,
        width: number,
        height: number,
        squares?: Points,
        movable?: boolean,
    ) {
        super(row, col, name, width, height, squares, movable);
    }

    onClick() {
        alert("PlantBasic");
    }
}
