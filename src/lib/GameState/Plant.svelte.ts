import { farmLand } from "./FarmLand.svelte";
import { GridObject, type GridObjectName } from "./GridObject.svelte";
import type { TileType } from "./Tile.svelte";
import type { Points } from "./types";

export class Plant extends GridObject {
    validTiles: TileType[] = ["SOIL"];
    health = $state<number>(300);
    constructor(
        row: number,
        col: number,
        name: GridObjectName,
        width: number,
        height: number,
        squares?: Points,
        movable?: boolean,
    ) {
        super(row, col, name, width, height, squares, movable);
    }

    onClick() {
        alert("PlantBasic");
    }

    update(timestamp: number): void {
        super.update(timestamp);
        this.health -= 0.1;
        if (farmLand.weather.weather === "raining") {
            this.health = Math.min(this.health + 1, 300);
        }
        if (this.health <= 0) {
            // kill
            farmLand.gridObjects[
                GridObject.getIteratorFromPoint({ row: this.row, col: this.col })
            ] = undefined;
        }
    }
}
