import { GridObject } from "./GridObject.svelte";
import type { Points } from "./types";

export type Tool = "cursor" | "mover";

export class Toolbar extends GridObject {
  tools = $state<Array<Tool>>(["cursor", "mover"]);
  constructor(row: number, col: number, squares?: Points) {
    super(row, col, "toolbar", 4, 2, squares, true);
  }
}
