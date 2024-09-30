import { GridObject } from "./GridObject.svelte";
import type { Points } from "./types";

export class Shop extends GridObject {
    static squares = [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 3, col: 1 },
        { row: 3, col: 2 },
        { row: 3, col: 3 },
    ];

    constructor(row: number, col: number) {
        super(row, col, "shop", 3, 3, Shop.squares, true);
    }

    onClick(): void {
        alert(this.name);
    }
}
