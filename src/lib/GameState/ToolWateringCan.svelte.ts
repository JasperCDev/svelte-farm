import { Component } from "./Component.svelte";
import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";

export class ToolWateringCan extends GridObject {
    static squares = [{ row: 1, col: 1 }];

    constructor(row: number, col: number) {
        super(row, col, "tool_watering_can", 1, 1);
    }
    onClick(): void {
        farmLand.selectedTool =
            farmLand.selectedTool === "watering_can" ? "cursor" : "watering_can";
    }

    update(timestamp: number): void {
        super.update(timestamp);
        if (farmLand.weather.weather === "raining") {
            farmLand.water = Math.min(farmLand.water + 0.1, 100);
        }
    }
}
