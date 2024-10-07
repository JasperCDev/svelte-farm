import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";

export class ToolDuplicate extends GridObject {
    static squares = [{ row: 1, col: 1 }];

    constructor(row: number, col: number) {
        super(row, col, "tool_duplicate", 1, 1);
    }
    onClick(): void {
        farmLand.selectedTool = farmLand.selectedTool === "duplicate" ? "cursor" : "duplicate";
    }

    update(timestamp: number): void {
        super.update(timestamp);
    }
}
