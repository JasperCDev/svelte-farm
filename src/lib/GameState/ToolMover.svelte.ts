import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";
import type { Points } from "./types";

export class ToolMover extends GridObject {
    static squares = [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
    ];

    constructor(row: number, col: number) {
        super(row, col, "toolMover", 2, 2, ToolMover.squares, true);
    }

    onClick(): void {
        farmLand.selectedTool = "mover";
    }
}
