import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";

export class LifeEnergyPod extends GridObject {
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
        super(row, col, "life_energy_pod", 3, 3, LifeEnergyPod.squares, true);
    }

    update(timestamp: number): void {
        // Update the farmLand's energyPodPosition if this pod has been dragged and released
        if (farmLand.isDragEnd && farmLand.focusedGridObjectId === this.id) {
            farmLand.energyPodPosition = { col: this.draggedCol, row: this.draggedRow };
        }
        super.update(timestamp);
    }
}
