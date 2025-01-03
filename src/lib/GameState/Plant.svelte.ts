import { farmLand } from "./FarmLand.svelte";
import { GridObject, type GridObjectName } from "./GridObject.svelte";
import { Tile, type TileType } from "./Tile.svelte";
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
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(): void {
        switch (farmLand.selectedTool) {
            case "cursor":
                this.onClick();
                break;
            case "hoe":
                break;
            case "watering_can":
                let tileIndx = Tile.getIteratorFromPoint({ row: this.row, col: this.col });
                let tile = farmLand.tiles[tileIndx];
                if (farmLand.water >= 25) {
                    if (tile.soilMoisture === 1) {
                        return;
                    }
                    tile.soilMoisture = 1;
                    farmLand.water -= 5;
                }
                break;
        }
    }

    update(timestamp: number): void {
        super.update(timestamp);
        let tileIndx = Tile.getIteratorFromPoint({ row: this.row, col: this.col });
        let tile = farmLand.tiles[tileIndx];
        if (tile.soilMoisture > 0) {
            if (this.health < 300) {
                this.health = Math.min(this.health + 0.1, 300);
            }
            tile.soilMoisture -= 0.001;
        } else {
            this.health -= 0.01;
        }
        if (this.health <= 0) {
            // kill
            GridObject.kill({ row: this.row, col: this.col });
        }
    }
}
