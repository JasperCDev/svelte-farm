import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";

export class MysteryBox extends GridObject {
    static squares = [{ row: 1, col: 1 }];
    price = $state(10);
    open = $state(false);
    constructor(row: number, col: number) {
        super(row, col, "mystery_box", 3, 3, MysteryBox.squares, true);
    }

    update(timestamp: number): void {}

    buy() {
        farmLand.currency.value -= this.price;
        this.price *= 1.1;
        this.open = true;
    }

    handleClick(): void {
        super.handleClick();
        this.buy();
    }
}
