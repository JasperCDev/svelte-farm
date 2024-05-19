<script lang="ts">
  import { getTileColor, type TilePiece } from "../CTiles.svelte";
  type Props = {
    tilePiece: TilePiece;
  };
  let { tilePiece }: Props = $props();
  const color = getTileColor(tilePiece.topLeft);
  const baseColor = getTileColor("GRASS");
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="solid"
>
  <g clip-path="url(#clip0_16_2)">
    <rect width="100%" height="100%" fill={baseColor} />
    <rect width="100%" height="100%" fill={color} />
  </g>
</svg>
