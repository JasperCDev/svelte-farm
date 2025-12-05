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
    }
}
