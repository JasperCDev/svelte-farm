import { GridObject } from "./GridObject.svelte";
import type { Points } from "./types";

export class Shrine extends GridObject {
    static squares = [{ row: 1, col: 1 }];

    constructor(row: number, col: number) {
        super(row, col, "shrine", 1, 1, Shrine.squares, true);
    }

    onClick(): void {
        alert(this.name);
    }
}
