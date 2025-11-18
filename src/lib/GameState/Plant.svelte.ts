import { moveTowards } from "../utils";
import { farmLand } from "./FarmLand.svelte";
import { GridObject, type GridObjectName } from "./GridObject.svelte";
import { Tile, type TileType } from "./Tile.svelte";
import type { Points } from "./types";

export class Orb {
    x = $state<number>(0);
    y = $state<number>(0);

    constructor(row: number, col: number) {
        this.x = row * farmLand.tileSize + farmLand.tileSize / 2;
        this.y = col * farmLand.tileSize + farmLand.tileSize / 2;
    }
}

export class Plant extends GridObject {
    validTiles: TileType[] = ["SOIL"];
    health = $state<number>(300);
    orbs = $state<Orb[]>([]);
    prevHour = 0;
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

    addOrb() {
        this.orbs = [...this.orbs, new Orb(this.row, this.col)];
    }

    removeOrb() {
        this.orbs = this.orbs.slice(0, -1);
        farmLand.currency.value += 1;
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
        let targetX = farmLand.energyPodPosition.col * farmLand.tileSize + farmLand.tileSize / 2;
        let targetY = farmLand.energyPodPosition.row * farmLand.tileSize + farmLand.tileSize / 2;
        for (let i = 0; i < this.orbs.length; i++) {
            let orb = this.orbs[i];

            const { x, y } = moveTowards(orb.x, orb.y, targetX, targetY, 2);

            orb.x = x;
            orb.y = y;

            if (x === targetX && y === targetY) {
                this.removeOrb();
            }
        }

        if (farmLand.time.hour !== this.prevHour) {
            this.prevHour = farmLand.time.hour;
            this.addOrb();
        }
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
