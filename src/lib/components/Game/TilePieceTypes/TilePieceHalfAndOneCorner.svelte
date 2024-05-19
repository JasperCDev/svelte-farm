<script lang="ts">
  import type { TilePiece } from "../CTiles.svelte";
  type Props = {
    tilePiece: TilePiece;
  };
  let { tilePiece }: Props = $props();
  console.log("half and one corner");
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="half-and-one-corner"
>
  <g clip-path="url(#clip0_26_24)">
    <rect width="100%" height="100%" fill="white" />
    <rect x="-50" width="100%" height="100%" fill="#90EE90" />
    <rect x="50" width="100%" height="100%" fill="#DEB887" />
    <rect
      x="160"
      y="50"
      width="110"
      height="110"
      rx="20"
      transform="rotate(-180 160 50)"
      fill="#808080"
    />
  </g>
  <defs>
    <clipPath id="clip0_26_24">
      <rect width="100%" height="100%" fill="white" />
    </clipPath>
  </defs>
</svg>
