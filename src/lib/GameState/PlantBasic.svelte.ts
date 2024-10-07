import { farmLand } from "./FarmLand.svelte";
import { Plant } from "./Plant.svelte";

export class PlantBasic extends Plant {
    static squares = [{ row: 1, col: 1 }];
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
}
