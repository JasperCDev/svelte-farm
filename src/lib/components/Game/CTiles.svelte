<script context="module">
  const TILE_PIECE_Z_INDEX = 10;
  export type ZeroThruFour = 0 | 1 | 2 | 3 | 4;
  export type OneThruFour = 0 | 1 | 2 | 3 | 4;
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
  export type TilePiecePos = "topLeft" | "topRight" | "bottomRight" | "bottomLeft";
  export function getTileColor(tileType: TileType | null) {
    if (tileType === null) {
      return "lightgreen";
    }
    switch (tileType) {
      case "GRASS":
        return "lightgreen";
      case "SOIL":
        return "#eab64f";
      case "WATER":
        return "#74ccf4";
    }
  }
</script>

<script lang="ts">
  import { farmLand } from "../../GameState/FarmLand.svelte";
  import type { TileType } from "../../GameState/Tile.svelte";
  import type { Point } from "../../GameState/types";
  import { derive } from "../../utils";
  let tilesPiecesToRender = $derived(derive(() => {
    const t = farmLand.tilePieces.map((tp) => {
    return {
      tp,
      objs: Object.keys(tp.typeCounts)
        .filter((t) => t !== "GRASS" && tp.typeCounts[t as TileType] !== 0)
        .map((type, i) => {
          let obj = {
            horizontal: false,
            vertical: false,
            isTop: false,
            isLeft: false,
            isOpposing: false,
            count: tp.typeCounts[type as TileType] as ZeroThruFour,
            color: getTileColor(type as TileType),
            excludingTile: null as TilePiecePos | null,
          };
          let isTopLeft = tp.topLeft === type;
          let isTopRight = tp.topRight === type;
          let isBottomRight = tp.bottomRight === type;
          let isBottomLeft = tp.bottomLeft === type;
          switch (obj.count) {
            case 4:
              return obj;
            case 3:
              if (!isTopLeft) {
                obj.excludingTile = "topLeft";
                return obj;
              }
              if (!isTopRight) {
                obj.excludingTile = "topRight";
                return obj;
              }
              if (!isBottomRight) {
                obj.excludingTile = "bottomRight";
                return obj;
              }
              obj.excludingTile = "bottomLeft";
              return obj;
            case 2:
              let isOpposing =
                (isTopLeft && isBottomRight) || (isTopRight && isBottomLeft);
              if (isOpposing) {
                obj.isLeft = isTopLeft;
                obj.isOpposing = true;
                return obj;
              }
              if (isTopLeft) {
                if (isTopRight) {
                  obj.horizontal = true;
                  obj.isTop = true;
                  return obj;
                } else {
                  obj.vertical = true;
                  obj.isLeft = true;
                  return obj;
                }
              }
              if (isTopRight) {
                obj.vertical = true;
                obj.isLeft = false;
                return obj;
              }
              obj.horizontal = true;
              obj.isTop = false;
              return obj;
            case 1:
              if (isTopLeft) {
                obj.isTop = true;
                obj.isLeft = true;
                return obj;
              }
              if (isTopRight) {
                obj.isTop = true;
                obj.isLeft = false;
                return obj;
              }
              if (isBottomRight) {
                obj.isTop = false;
                obj.isLeft = false;
                return obj;
              }
              obj.isTop = false;
              obj.isLeft = true;
              return obj;
          }
          return obj;
        }),
    };
  })
    return t;
  }));
</script>

{#each tilesPiecesToRender as tilePiece}
  <div
    class="tile-piece"
    style="
      top: {tilePiece.tp.point.row * farmLand.tileSize -
      farmLand.tileSize * 1.5}px;
      left: {tilePiece.tp.point.col * farmLand.tileSize -
      farmLand.tileSize * 1.5}px;
      --z-index: {TILE_PIECE_Z_INDEX};
    "
  >
    {#each tilePiece.objs as obj}
      {#if obj.count === 4}
        <div
          class="tile-piece-corner"
          style="
          top: 0;
          left: 0;
          background-color: {obj.color};
        "
          id="fourCorners"
        ></div>
      {:else if obj.count === 3}
        <div
          class="tile-piece-corner"
          style="
            top: 0;
            left: 0;
            background-color: {obj.color};
          "
          id="threeCorners"
        ></div>
        <div
          class="tile-piece-corner is-rounded"
          style="
            top: {obj.excludingTile!.startsWith("bottom") ? "50%" : "-50%"};
            left: {obj.excludingTile!.endsWith("Left") ? "-50%" : "50%"};
            background-color: {getTileColor("GRASS")};

          "
          id="threeCorners_hole"
        ></div>
      {:else if obj.count === 2}
        {#if obj.isOpposing}
          <div
            class="tile-piece-corner is-rounded"
            style="
              top: -50%;
              left: {obj.isLeft ? "-50%" : "50%"};
              background-color: {obj.color};
            "
            id="opposingCorner"
          ></div>
          <div
            class="tile-piece-corner is-rounded"
            style="
              top: 50%;
              left: {obj.isLeft ? "50%" : "-50%"};
              background-color: {obj.color};
            "
            id="opposingCorner"
          ></div>
        {:else}
          <div
            class="tile-piece-corner"
            style="
              top: {obj.vertical ? 0 : obj.isTop ? "-50%" : "50%"};
              left: {obj.horizontal ? 0 : obj.isLeft ? "-50%" : "50%"};
              background-color: {obj.color};
            "
            id="adjacentCorners"
          ></div>
        {/if}
      {:else}
        <div
          class="tile-piece-corner is-rounded"
          style="
            top: {obj.isTop ? "-50%" : "50%"};
            left: {obj.isLeft ? "-50%" : "50%"};
            background-color: {obj.color};
            z-index: {TILE_PIECE_Z_INDEX + 1}
          "
          id="oneCorner"
        ></div>
      {/if}
    {/each}
  </div>
{/each}

<style>
  .tile-piece {
    position: absolute;
    width: var(--tile-size);
    height: var(--tile-size);
    /* outline: 1px solid red; */
    background-color: lightgreen;
    overflow: hidden;
    z-index: var(--z-index);

  }
  .is-rounded {
    border-radius: 30%;
  }

  .tile-piece-corner {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
