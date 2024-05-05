import { GridObject } from "./GridObject.svelte";
import type { Points } from "./types";

export class Shop extends GridObject {
  constructor(row: number, col: number, squares?: Points) {
    super(row, col, "shop", 3, 3, squares, true, () => alert(this.name));
  }
}
