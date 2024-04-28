export type Point = { row: number; col: number };
export type Points = Array<Point>;
export type Tool = "cursor" | "mover";

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
      if (!cols.includes(square.col)) {
        cols.push(square.col);
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
  col = $state<number>()!;
  name = $state<"plant" | "shop" | "toolbar">()!;
  space = $state<GridObjectSpace>()!;
  id = $state<string>()!;
  placing = $state<boolean>(false);
  movable = $state<boolean>(false);
  invalidPlacement = $state<boolean>(false);
  constructor(
    row: number,
    col: number,
    name: typeof this.name,
    squares?: Points,
    movable?: boolean
  ) {
    this.row = row;
    this.col = col;
    this.space = new GridObjectSpace(squares || [{ row, col }]);
    this.name = name;
    this.id = FarmLand.getIdFromPoint({ row, col });
    this.movable = Boolean(movable);
  }
}

export class Plant extends GridObject {
  constructor(row: number, col: number, squares?: Points) {
    super(row, col, "plant", squares, true);
  }
}

export class Shop extends GridObject {
  constructor(row: number, col: number, squares?: Points) {
    super(row, col, "shop", squares, true);
  }
}

export class Tile {
  row = $state<number>()!;
  col = $state<number>()!;
  id = $state<string>()!;
  type = $state<"OCCUPIED" | "EMPTY">("EMPTY");
  movable = $state<boolean>(true);
  constructor(tileIndex: number, type?: typeof this.type) {
    const tilePoint = FarmLand.getPointFromIterator(tileIndex);
    this.id = FarmLand.getIdFromPoint(tilePoint);
    this.row = tilePoint.row;
    this.col = tilePoint.col;
    if (type) this.type = type;
  }

  public updateTile() {
    this.type = this.type === "EMPTY" ? "OCCUPIED" : "EMPTY";
  }
}

export class Toolbar extends GridObject {
  tools = $state<Array<Tool>>(["cursor", "mover"]);
  constructor(row: number, col: number, squares?: Points) {
    super(row, col, "toolbar", squares, true);
  }
}

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
    ] = new Plant(1, 1, [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ]);
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
