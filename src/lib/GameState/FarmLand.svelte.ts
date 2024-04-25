export class Plant {
  id = $state<string>()!;
  row = $state<number>()!;
  column = $state<number>()!;
  health = $state<number>()!;
  static idHelper = 0;
  constructor(row: number, column: number) {
    Plant.idHelper++;
    this.id = `${row}-${column}-${Plant.idHelper}`;
    this.row = row;
    this.column = column;
  }
}

export class Tile {
  row = $state<number>()!;
  column = $state<number>()!;
  id = $state<string>()!;
  type = $state<"OCCUPIED" | "EMPTY">("EMPTY");
  constructor(tileIndex: number, type?: typeof this.type) {
    const tilePoint = FarmLand.getPointFromIterator(tileIndex);
    this.id = FarmLand.getTileIdFromPoint(tilePoint);
    this.row = tilePoint.row;
    this.column = tilePoint.column;
    if (type) this.type = type;
  }

  public updateTile() {
    this.type = this.type === "EMPTY" ? "OCCUPIED" : "EMPTY";
  }
}

export class FarmLand {
  static TIME_SPEED = 500;
  static ROW_COUNT = 18;
  static COLUMN_COUNT = 32;
  public tiles = $state(
    Array.from({ length: FarmLand.COLUMN_COUNT * FarmLand.ROW_COUNT }, (_, i) =>
      i < 4 ? new Tile(i, "OCCUPIED") : new Tile(i)
    )
  );
  public plants = $state(
    Array.from({ length: 4 }, (_, i) => {
      const { row, column } = FarmLand.getPointFromIterator(i);
      return new Plant(row, column);
    })
  );

  public tileSize = $state<number>(0);
  public gridWidth = $state<number>(0);
  public gridHeight = $state<number>(0);

  constructor() {
    this.getGridSize();
    // setInterval(() => {
    //   for (const tile of this.tiles) {
    //     tile.updateTile();
    //   }
    // }, 1000);
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
    const column = n % FarmLand.COLUMN_COUNT || FarmLand.COLUMN_COUNT;
    return { row, column };
  }

  static getTileIdFromPoint(point: { row: number; column: number }) {
    return (
      point.row.toString().padStart(2, "0") +
      point.column.toString().padStart(2, "0")
    );
  }
}

export let farmLand = new FarmLand();
