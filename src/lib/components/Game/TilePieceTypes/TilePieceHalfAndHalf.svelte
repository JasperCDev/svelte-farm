<script lang="ts">
  import { getTileColor, type TilePiece } from "../CTiles.svelte";
  type Props = {
    tilePiece: TilePiece;
  };
  let { tilePiece }: Props = $props();
  let leftColor = $derived(getTileColor(tilePiece.topLeft));
  let rightColor = $derived(getTileColor(tilePiece.bottomRight));
  let rotation = $derived(
    tilePiece.topLeft === tilePiece.topRight ? "90" : "0"
  );
  console.log("half and half");
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="half-and-half"
  transform="rotate({rotation})"
>
  <g clip-path="url(#clip0_17_11)">
    <rect x="-50" width="100%" height="100%" fill={leftColor} />
    <rect x="50" width="100%" height="100%" fill={rightColor} />
  </g>
</svg>
