import { GridObject } from "./GridObject.svelte";

export class PlantBag extends GridObject {
    constructor(row: number, col: number) {
        super(row, col, "plant_bag", 1, 1, [{ row: 1, col: 1 }], true);
    }
}
