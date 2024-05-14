<script lang="ts">
  import { FarmLand, farmLand } from "../../GameState/FarmLand.svelte";
  import type { TileType } from "../../GameState/Tile.svelte";
  import type { Point } from "../../GameState/types";
  import TilePieceSolid from "./TilePieceTypes/TilePieceSolid.svelte";
  type TilePiece = {
    point: Point;
    topLeft: null | TileType;
    topRight: null | TileType;
    bottomLeft: null | TileType;
    bottomRight: null | TileType;
  };
  let tilesPiecesColCount = FarmLand.COL_COUNT + 1;
  let tilesPiecesRowCount = FarmLand.ROW_COUNT + 1;
  let tilesPieces = Array.from<object, TilePiece>(
    { length: tilesPiecesColCount * tilesPiecesRowCount },
    (_, i) => ({
      point: {
        row: Math.ceil((i + 1) / tilesPiecesColCount),
        col: (i + 1) % tilesPiecesColCount || tilesPiecesColCount,
      },
      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null,
    })
  );
  for (let i = 0; i < farmLand.tiles.length; i++) {
    let tile = farmLand.tiles[i];
    let topLeftIndx = i + (tile.row - 1);
    let topRightIndx = topLeftIndx + 1;
    let bottomLeftIndx = tile.row * tilesPiecesColCount - 1 + tile.col;
    let bottomRightIndx = bottomLeftIndx + 1;
    let topLeft = tilesPieces[topLeftIndx];
    let topRight = tilesPieces[topRightIndx];
    let bottomLeft = tilesPieces[bottomLeftIndx];
    let bottomRight = tilesPieces[bottomRightIndx];
    topLeft.bottomRight = tile.type;
    topRight.bottomLeft = tile.type;
    bottomLeft.topRight = tile.type;
    bottomRight.topLeft = tile.type;
  }
</script>

{#each tilesPieces as tilesPiece}
  <div
    class="tile-piece"
    style="
      top: {tilesPiece.point.row * farmLand.tileSize -
      farmLand.tileSize * 1.5}px;
      left: {tilesPiece.point.col * farmLand.tileSize -
      farmLand.tileSize * 1.5}px;"
  >
    <TilePieceSolid />
  </div>
{/each}

<style>
  .tile-piece {
    position: absolute;
    width: var(--tile-size);
    height: var(--tile-size);
  }
</style>
