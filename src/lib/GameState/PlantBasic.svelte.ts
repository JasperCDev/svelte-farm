import { GridObject } from "./GridObject.svelte";
import plantTypes from "./plantTypes";

export class PlantBasic extends GridObject {
    static squares = [{ row: 1, col: 1 }];
    constructor(row: number, col: number) {
        super(row, col, "plant", 1, 1, PlantBasic.squares, true);
    }

    onClick() {
        alert("PlantBasic");
    }
}
