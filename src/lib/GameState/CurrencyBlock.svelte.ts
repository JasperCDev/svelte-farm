import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";

export class CurrencyBlock extends GridObject {
    currencyValue = $state<number>(0);
    static squares = [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
    ];

    constructor(row: number, col: number) {
        super(row, col, "currency_block", 4, 1, CurrencyBlock.squares, true);
    }

    update(timestamp: number): void {
        super.update(timestamp);
        this.currencyValue = farmLand.currency.value;
    }
}
