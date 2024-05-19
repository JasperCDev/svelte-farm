<script context="module">
  export type ZeroThruFour = 0 | 1 | 2 | 3 | 4;
  export type TilePiece = {
    point: Point;
    topLeft: TileType | null;
    topRight: TileType | null;
    bottomLeft: TileType | null;
    bottomRight: TileType | null;
    typeCounts: {
      [key in TileType]: ZeroThruFour;
    };
  };
  export function getTileColor(tileType: TileType | null) {
    if (tileType === null) {
      return "lightgreen";
    }
    switch (tileType) {
      case "GRASS":
        return "lightgreen";
      case "SOIL":
        return "burlywood";
      case "WATER":
        return "lightblue";
    }
  }
</script>

<script lang="ts">
  import { FarmLand, farmLand } from "../../GameState/FarmLand.svelte";
  import type { TileType } from "../../GameState/Tile.svelte";
  import type { Point } from "../../GameState/types";
  import { derive } from "../../utils";
  import TilePieceSolid from "./TilePieceTypes/TilePieceSolid.svelte";
  import TilePieceOneCorner from "./TilePieceTypes/TilePieceOneCorner.svelte";
  import TilePieceOpposingCorners from "./TilePieceTypes/TilePieceOpposingCorners.svelte";
  import TilePieceTwoCorners from "./TilePieceTypes/TilePieceTwoCorners.svelte";
  import TilePieceHalfAndTwoCorners from "./TilePieceTypes/TilePieceHalfAndTwoCorners.svelte";
  import TilePieceHalfAndHalf from "./TilePieceTypes/TilePieceHalfAndHalf.svelte";
  import TilePieceThreeCorners from "./TilePieceTypes/TilePieceThreeCorners.svelte";
  import TilePieceFourCorners from "./TilePieceTypes/TilePieceFourCorners.svelte";

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
      typeCounts: {
        GRASS: 0 as ZeroThruFour,
        SOIL: 0 as ZeroThruFour,
        WATER: 0 as ZeroThruFour,
      },
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
    topLeft.typeCounts[tile.type]++;
    topRight.typeCounts[tile.type]++;
    bottomRight.typeCounts[tile.type]++;
    bottomLeft.typeCounts[tile.type]++;
  }

  const tilesPiecesToRender = tilesPieces.map((t) => {
    let uniqCorners = (Object.keys(t.typeCounts) as TileType[]).filter(
      (type) => type !== "GRASS" && t.typeCounts[type] > 0
    ).length as ZeroThruFour;
    let doubleTileCount = derive(() => {
      let count = 0;
      if (t.typeCounts.SOIL >= 2) {
        count++;
      }
      if (t.typeCounts.WATER >= 2) {
        count++;
      }
      return count;
    });
    switch (uniqCorners) {
      case 0:
        return {
          tilePiece: t,
          component: TilePieceSolid,
        };
      case 1:
        if (
          t.topLeft === t.topRight &&
          t.topRight === t.bottomRight &&
          t.bottomRight === t.bottomLeft
        ) {
          console.log("solid");
          return {
            tilePiece: t,
            component: TilePieceSolid,
          };
        }
        if (doubleTileCount === 1) {
          return {
            tilePiece: t,
            component: TilePieceHalfAndHalf,
          };
        }
        return {
          tilePiece: t,
          component: TilePieceOneCorner,
        };
      case 2:
        if (doubleTileCount === 2) {
          return {
            tilePiece: t,
            component: TilePieceHalfAndHalf,
          };
        }
        let isOpossing =
          (t.topRight !== "GRASS" && t.bottomLeft !== "GRASS") ||
          (t.topLeft !== "GRASS" && t.bottomRight !== "GRASS");
        if (isOpossing) {
          return {
            tilePiece: t,
            component: TilePieceOpposingCorners,
          };
        }
        return {
          tilePiece: t,
          component: TilePieceTwoCorners,
        };
      case 3:
        if (doubleTileCount === 1) {
          return {
            tilePiece: t,
            component: TilePieceHalfAndTwoCorners,
          };
        }
        return {
          tilePiece: t,
          component: TilePieceThreeCorners,
        };
      case 4:
        return {
          tilePiece: t,
          component: TilePieceFourCorners,
        };
    }
  });
</script>

{#each tilesPiecesToRender as tilePiece}
  <div
    class="tile-piece"
    style="
      top: {tilePiece.tilePiece.point.row * farmLand.tileSize -
      farmLand.tileSize * 1.5}px;
      left: {tilePiece.tilePiece.point.col * farmLand.tileSize -
      farmLand.tileSize * 1.5}px;"
  >
    <svelte:component
      this={tilePiece.component}
      tilePiece={tilePiece.tilePiece}
    />
  </div>
{/each}

<style>
  .tile-piece {
    position: absolute;
    width: var(--tile-size);
    height: var(--tile-size);
    outline: 1px solid red;
  }
</style>
