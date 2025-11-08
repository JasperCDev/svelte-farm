import { Component } from "./Component.svelte";
import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";
import { Plant } from "./Plant.svelte";

export class Currency extends Component {
    value = $state<number>(5);
    rent = $state<number>(100);
    prevHour = 9;
    prevDay = 1;

    update(timestamp: number): void {
        super.update(timestamp);
        if (farmLand.time.hour !== this.prevHour) {
            this.prevHour = farmLand.time.hour;
            for (let gridObject of farmLand.gridObjects) {
                if (typeof gridObject === "undefined") {
                    continue;
                }
                if (gridObject instanceof Plant) {
                    this.value += 1;
                }
            }
        }
        if (farmLand.time.day !== this.prevDay) {
            this.prevDay = farmLand.time.day;
            this.value = Math.max(this.value - this.rent, 0);
            if (this.value <= 0) {
                alert("game over");
                farmLand.isGameOver = true;
            }
            this.rent *= 1.5;
        }
    }
}
