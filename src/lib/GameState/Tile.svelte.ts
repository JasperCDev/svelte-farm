import { Component } from "./Component.svelte";
import { FarmLand, farmLand } from "./FarmLand.svelte";
import type { Point } from "./types";

export type TileType = "SOIL" | "WATER" | "GRASS";

export class Tile extends Component {
    static idHelper = 0;
    row = $state<number>()!;
    col = $state<number>()!;
    id = $state<string>()!;
    type = $state<TileType>("GRASS");
    movable = $state<boolean>(true);

    emptySoilCountdown = 1000;
    constructor(tileIndex: number, type?: TileType) {
        super();
        let tilePoint = Tile.getPointFromIterator(tileIndex);
        this.id = Tile.getIdFromPoint(tilePoint);
        this.row = tilePoint.row;
        this.col = tilePoint.col;
        if (type) this.type = type;
    }

    handleClick() {
        switch (farmLand.selectedTool) {
            case "cursor":
                break;
            case "hoe":
                farmLand.updateTileType(this, "SOIL");
                this.type = "SOIL";
                break;
        }
    }

    update(timestamp: number): void {
        let gridObject =
            farmLand.gridObjects[Tile.getIteratorFromPoint({ row: this.row, col: this.col })];
        if (this.type === "SOIL" && typeof gridObject === "undefined") {
            this.emptySoilCountdown -= 1;
        }
        if (this.emptySoilCountdown === 0) {
            farmLand.updateTileType(this, "GRASS");
            this.emptySoilCountdown = 1000;
        }
    }

    static getIteratorFromId(id: string) {
        let split = id.split("-");
        let rowCount = parseInt(split[0]);
        let colCount = parseInt(split[1]);
        return FarmLand.COL_COUNT * (rowCount - 1) + colCount - 1;
    }

    static getIteratorFromPoint(point: Point) {
        return (point.row - 1) * FarmLand.COL_COUNT + point.col - 1;
    }

    static getIdFromPoint(point: Point) {
        Tile.idHelper++;
        return point.row.toString().padStart(2, "0") + "-" + point.col.toString().padStart(2, "0");
    }

    static getPointFromIterator(i: number) {
        let n = i + 1;
        let row = Math.ceil(n / FarmLand.COL_COUNT);
        let col = n % FarmLand.COL_COUNT || FarmLand.COL_COUNT;
        return { row, col };
    }
    static getTileByPoint(point: Point): Tile {
        return farmLand.tiles[Tile.getIteratorFromPoint(point)];
    }
}
