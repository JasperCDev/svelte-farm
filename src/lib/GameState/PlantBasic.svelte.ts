import { FarmLand, farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";
import { Plant } from "./Plant.svelte";

export class PlantBasic extends Plant {
    static squares = [{ row: 1, col: 1 }];
    cost = 1;
    constructor(row: number, col: number) {
        super(row, col, "plant_basic", 1, 1, PlantBasic.squares, true);
    }

    onClick() {
        switch (farmLand.selectedTool) {
            case "cursor":
                alert("PlantBasic");
                break;
            case "hoe":
                break;
            case "watering_can":
        }
    }

    duplicate() {
        if (farmLand.currency.value < this.cost) {
            return;
        }
        GridObject.duplicating = true;
        console.log("duplicate");
        let obj = new PlantBasic(FarmLand.ROW_COUNT, FarmLand.COL_COUNT);
        obj.draggedRow = this.row;
        obj.draggedCol = this.col;
        farmLand.focusedGridObjectId = obj.id;
        let pos = GridObject.getIteratorFromPoint({
            row: FarmLand.ROW_COUNT + 1,
            col: FarmLand.COL_COUNT + 1,
        });
        farmLand.gridObjects[pos] = obj;
    }

    duplicateEnd() {
        farmLand.currency.value -= this.cost;
        GridObject.duplicating = false;
    }
}
