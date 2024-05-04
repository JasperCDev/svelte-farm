import { FarmLand } from "./FarmLand.svelte";
import type { Points } from "./types";

export type GridObjectName = "plant" | "shop" | "toolbar";

export class GridObjectSpace {
  width = $state<number>();
  height = $state<number>();
  squares = $state<Points>()!;
  constructor(width: number, height: number, squares: Points) {
    this.width = width;
    this.height = height;
    this.squares = squares;
  }
}

export class GridObject {
  row = $state<number>()!;
  col = $state<number>()!;
  name = $state<GridObjectName>()!;
  space = $state<GridObjectSpace>()!;
  id = $state<string>()!;
  placing = $state<boolean>(false);
  movable = $state<boolean>(false);
  invalidPlacement = $state<boolean>(false);
  constructor(
    row: number,
    col: number,
    name: GridObjectName,
    width: number,
    height: number,
    squares?: Points,
    movable?: boolean
  ) {
    this.row = row;
    this.col = col;
    this.space = new GridObjectSpace(width, height, squares || [{ row, col }]);
    this.name = name;
    this.id = FarmLand.getIdFromPoint({ row, col });
    this.movable = Boolean(movable);
  }
}
