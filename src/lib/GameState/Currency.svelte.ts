import { Component } from "./Component.svelte";
import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";
import { Plant } from "./Plant.svelte";

export class Currency extends Component {
    value = $state<number>(0);
    prevDay = 1;

    update(timestamp: number): void {
        super.update(timestamp);
        if (farmLand.time.day !== this.prevDay) {
            this.prevDay = farmLand.time.day;
            for (const gridObject of farmLand.gridObjects) {
                if (typeof gridObject === "undefined") {
                    continue;
                }
                if (gridObject instanceof Plant) {
                    this.value += 1;
                }
            }
        }
    }
}
