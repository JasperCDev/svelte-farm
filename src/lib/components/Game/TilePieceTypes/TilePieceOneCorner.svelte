<script lang="ts">
  import type { TileType } from "../../../GameState/Tile.svelte";
  import { getTileColor, type TilePiece } from "../CTiles.svelte";
  type Props = {
    tilePiece: TilePiece;
  };
  let { tilePiece }: Props = $props();
  let isPartialEmpty = $derived(
    tilePiece.topLeft === null ||
      tilePiece.topRight === null ||
      tilePiece.bottomRight === null ||
      tilePiece.bottomLeft === null
  );
  let primaryTileType = $derived(
    Object.keys(tilePiece.typeCounts).filter(
      (tp) => tilePiece.typeCounts[tp as TileType]
    )[isPartialEmpty ? 0 : 1] as TileType
  );
  let grassCount = $derived(
    Object.keys(tilePiece).filter(
      (t) => tilePiece[t as keyof TilePiece] === "GRASS"
    ).length
  );
  let baseColor = $derived(
    grassCount === 3 ? getTileColor("GRASS") : getTileColor(primaryTileType)
  );
  let otherColor = $derived(
    grassCount === 3 ? getTileColor(primaryTileType) : getTileColor("GRASS")
  );
  console.log(baseColor, otherColor, tilePiece.topLeft);
  let rotation = $derived(
    getTileColor(tilePiece.topLeft) === otherColor
      ? "0"
      : getTileColor(tilePiece.topRight) === otherColor
        ? "90"
        : getTileColor(tilePiece.bottomRight) === otherColor
          ? "180"
          : "270"
  );
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="one-corner"
  transform="rotate({rotation})"
>
  <g clip-path="url(#clip0_25_6)">
    <rect width="100%" height="100%" fill={baseColor} />
    <rect x="-60" y="-70" width="110" height="120" rx="20" fill={otherColor} />
  </g>
</svg>
