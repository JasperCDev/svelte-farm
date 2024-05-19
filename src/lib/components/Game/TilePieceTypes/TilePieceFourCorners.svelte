<script lang="ts">
  import { getTileColor, type TilePiece } from "../CTiles.svelte";
  type Props = {
    tilePiece: TilePiece;
  };
  let { tilePiece }: Props = $props();
  let baseColor = $derived(getTileColor("GRASS"));
  let topLeftColor = $derived(getTileColor(tilePiece.topLeft));
  let topRightColor = $derived(getTileColor(tilePiece.topRight));
  let bottomRightColor = $derived(getTileColor(tilePiece.bottomRight));
  let bottomLeftColor = $derived(getTileColor(tilePiece.bottomLeft));
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="four-corners"
>
  <g clip-path="url(#clip0_26_18)">
    <rect
      x="100"
      y="101"
      width="100"
      height="100"
      transform="rotate(-180 100 101)"
      fill={topLeftColor}
    />
    <rect
      x="160"
      y="172"
      width="110"
      height="120"
      rx="20"
      transform="rotate(-180 160 172)"
      fill={topRightColor}
    />
    <rect
      x="50"
      y="172"
      width="110"
      height="120"
      rx="20"
      transform="rotate(-180 50 172)"
      fill={bottomRightColor}
    />
    <rect
      x="50"
      y="52"
      width="110"
      height="110"
      rx="20"
      transform="rotate(-180 50 52)"
      fill={bottomLeftColor}
    />
    <rect
      x="160"
      y="52"
      width="110"
      height="110"
      rx="20"
      transform="rotate(-180 160 52)"
      fill={baseColor}
    />
  </g>
</svg>
