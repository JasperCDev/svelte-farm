type Point = { row: number; column: number };
type Points = Array<Point>;

export class GridObjectSpace {
  width = $state<number>();
  height = $state<number>();
  squares = $state<Points>()!;
  constructor(squares: Points) {
    const { width, height } = this.getWidthAndHeight(squares);
    this.width = width;
    this.height = height;
    this.squares = squares;
  }

  getWidthAndHeight(squares: Points) {
    let cols: number[] = [];
    let rows: number[] = [];
    for (const square of squares) {
      if (!cols.includes(square.column)) {
        cols.push(square.column);
      }
      if (!rows.includes(square.row)) {
        rows.push(square.row);
      }
    }
    return {
      width: cols.length,
      height: rows.length,
    };
  }
}

export class GridObject {
  row = $state<number>()!;
  column = $state<number>()!;
  name = $state<"plant">()!;
  space = $state<GridObjectSpace>()!;

  constructor(
    row: number,
    column: number,
    name: typeof this.name,
    squares?: Points
  ) {
    this.row = row;
    this.column = column;
    this.space = new GridObjectSpace(squares || [{ row, column }]);
    this.name = name;
  }
}

export class Plant extends GridObject {
  id = $state<string>()!;
  health = $state<number>()!;
  static idHelper = 0;
  constructor(row: number, column: number, squares?: Points) {
    super(row, column, "plant", squares);
    Plant.idHelper++;
    this.id = `${row}-${column}-${Plant.idHelper}`;
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
  public tiles = $state<Array<Tile>>(
    Array.from({ length: FarmLand.COLUMN_COUNT * FarmLand.ROW_COUNT }, (_, i) =>
      i < 2 ? new Tile(i, "OCCUPIED") : new Tile(i)
    )
  );
  public gridObjects = $state<Array<GridObject>>([
    new Plant(1, 1, [
      { row: 1, column: 1 },
      { row: 1, column: 2 },
    ]),
  ]);

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
