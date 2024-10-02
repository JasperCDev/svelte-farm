import { Component } from "./Component.svelte";
import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";

export class ToolHoe extends GridObject {
    static squares = [{ row: 1, col: 1 }];
    constructor(row: number, col: number) {
        super(row, col, "tool_hoe", 1, 1);
    }
    onClick(): void {
        farmLand.selectedTool = farmLand.selectedTool === "hoe" ? "cursor" : "hoe";
    }
}
