import { GridObject } from "./GridObject.svelte";

export class SeedBag extends GridObject {
    static squares = [{ row: 1, col: 1 }];
    constructor(row: number, col: number) {
        super(row, col, "seed_bag", 1, 1, [{ row: 0, col: 0 }], true);
    }
}
