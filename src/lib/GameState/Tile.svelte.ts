import { FarmLand, farmLand } from "./FarmLand.svelte";

export type TileType = "SOIL" | "WATER" | "GRASS";

export class Tile {
    row = $state<number>()!;
    col = $state<number>()!;
    id = $state<string>()!;
    type = $state<TileType>("GRASS");
    movable = $state<boolean>(true);
    constructor(tileIndex: number, type?: TileType) {
        let tilePoint = FarmLand.getPointFromIterator(tileIndex);
        this.id = FarmLand.getIdFromPoint(tilePoint);
        this.row = tilePoint.row;
        this.col = tilePoint.col;
        if (type) this.type = type;
    }

    handleClick() {
        farmLand.updateTileType(this, this.type === "SOIL" ? "GRASS" : "SOIL");
    }
}
