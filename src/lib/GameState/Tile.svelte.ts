import { FarmLand } from "./FarmLand.svelte";

export type TileType = "SOIL" | "WATER";

export class Tile {
  row = $state<number>()!;
  col = $state<number>()!;
  id = $state<string>()!;
  type = $state<TileType>("SOIL");
  movable = $state<boolean>(true);
  constructor(tileIndex: number, type?: TileType) {
    const tilePoint = FarmLand.getPointFromIterator(tileIndex);
    this.id = FarmLand.getIdFromPoint(tilePoint);
    this.row = tilePoint.row;
    this.col = tilePoint.col;
    if (type) this.type = type;
  }
}
