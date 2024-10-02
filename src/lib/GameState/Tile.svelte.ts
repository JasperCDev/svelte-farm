import { FarmLand, farmLand } from "./FarmLand.svelte";
import type { Point } from "./types";

export type TileType = "SOIL" | "WATER" | "GRASS";

export class Tile {
    static idHelper = 0;
    row = $state<number>()!;
    col = $state<number>()!;
    id = $state<string>()!;
    type = $state<TileType>("GRASS");
    movable = $state<boolean>(true);
    constructor(tileIndex: number, type?: TileType) {
        let tilePoint = Tile.getPointFromIterator(tileIndex);
        this.id = Tile.getIdFromPoint(tilePoint);
        this.row = tilePoint.row;
        this.col = tilePoint.col;
        if (type) this.type = type;
    }

    handleClick() {
        farmLand.updateTileType(this, this.type === "SOIL" ? "GRASS" : "SOIL");
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
}
