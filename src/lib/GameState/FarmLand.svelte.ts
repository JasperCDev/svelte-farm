import type { GridObject } from "./GridObject.svelte";
import { Plant } from "./Plant.svelte";
import { Shop } from "./Shop.svelte";
import { Tile } from "./Tile.svelte";
import { Toolbar, type Tool } from "./Toolbar.svelte";

export class FarmLand {
  static idHelper = 0;
  static TIME_SPEED = 500;
  static ROW_COUNT = 18;
  static COLUMN_COUNT = 32;
  public tiles = $state<Array<Tile>>(
    Array.from(
      { length: FarmLand.COLUMN_COUNT * FarmLand.ROW_COUNT },
      (_, i) => new Tile(i)
    )
  );
  public gridObjects = $state<Array<GridObject | undefined>>(
    Array.from({
      length: FarmLand.COLUMN_COUNT * FarmLand.ROW_COUNT,
    })
  );

  public tileSize = $state<number>(0);
  public gridWidth = $state<number>(0);
  public gridHeight = $state<number>(0);

  public interactionMode = $state<"cursor" | "placing">("cursor");
  public selectedGridObjectId = $state<string | null>(null);
  public selectedTool = $state<Tool>("cursor");
  constructor() {
    this.getGridSize();
    this.gridObjects[
      FarmLand.getIteratorFromId(FarmLand.getIdFromPoint({ row: 1, col: 1 }))
    ] = new Plant(1, 1, "basic");
    this.gridObjects[
      FarmLand.getIteratorFromId(FarmLand.getIdFromPoint({ row: 10, col: 10 }))
    ] = new Shop(10, 10, [
      { row: 10, col: 10 },
      { row: 10, col: 11 },
      { row: 10, col: 12 },
      { row: 11, col: 10 },
      { row: 11, col: 11 },
      { row: 11, col: 12 },
      { row: 12, col: 10 },
      { row: 12, col: 11 },
      { row: 12, col: 12 },
    ]);
    this.gridObjects[
      FarmLand.getIteratorFromId(FarmLand.getIdFromPoint({ row: 17, col: 15 }))
    ] = new Toolbar(17, 15, [
      { row: 17, col: 15 },
      { row: 17, col: 16 },
      { row: 17, col: 17 },
      { row: 17, col: 18 },
      { row: 18, col: 15 },
      { row: 18, col: 16 },
      { row: 18, col: 17 },
      { row: 18, col: 18 },
    ]);
    this.gridObjects[
      FarmLand.getIteratorFromId(FarmLand.getIdFromPoint({ row: 5, col: 10 }))
    ] = new Plant(5, 10, "bush");
  }

  public getGridSize() {
    const widthPercent = window.innerWidth / 16000000;
    const heightPercent = window.innerHeight / 9000000;
    const smallestPercent = Math.min(widthPercent, heightPercent);
    this.gridWidth = Math.round(16000000 * smallestPercent);
    this.gridHeight = Math.round(9000000 * smallestPercent);
    this.tileSize = this.gridHeight / FarmLand.ROW_COUNT;
  }

  static getPointFromIterator(i: number) {
    const n = i + 1;
    const row = Math.ceil(n / FarmLand.COLUMN_COUNT);
    const col = n % FarmLand.COLUMN_COUNT || FarmLand.COLUMN_COUNT;
    return { row, col };
  }

  static getIteratorFromId(id: string) {
    const split = id.split("-");
    const rowCount = parseInt(split[0]);
    const colCount = parseInt(split[1]);
    return FarmLand.COLUMN_COUNT * (rowCount - 1) + colCount - 1;
  }

  static getIdFromPoint(point: { row: number; col: number }) {
    FarmLand.idHelper++;
    return (
      point.row.toString().padStart(2, "0") +
      "-" +
      point.col.toString().padStart(2, "0")
    );
  }
}

export let farmLand = new FarmLand();
