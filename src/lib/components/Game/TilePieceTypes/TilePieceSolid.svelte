<script lang="ts">
  import { getTileColor, type TilePiece } from "../CTiles.svelte";
  type Props = {
    tilePiece: TilePiece;
  };
  let { tilePiece }: Props = $props();
  const color = getTileColor(tilePiece.topLeft);
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="solid"
>
  <rect width="100%" height="100%" fill={color} />
</svg>
