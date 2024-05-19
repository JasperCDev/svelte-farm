import { FarmLand } from "./FarmLand.svelte";

export type TileType = "SOIL" | "WATER" | "GRASS";

export class Tile {
  row = $state<number>()!;
  col = $state<number>()!;
  id = $state<string>()!;
  type = $state<TileType>(["SOIL", "WATER", "GRASS"][0] as TileType);
  movable = $state<boolean>(true);
  constructor(tileIndex: number, type?: TileType) {
    let tilePoint = FarmLand.getPointFromIterator(tileIndex);
    this.id = FarmLand.getIdFromPoint(tilePoint);
    this.row = tilePoint.row;
    this.col = tilePoint.col;
    this.type = tileIndex % 2 === 0 ? "GRASS" : "SOIL";
    if (type) this.type = type;
  }

  handleClick() {
    this.type = this.type === "WATER" ? "SOIL" : "WATER";
  }
}
