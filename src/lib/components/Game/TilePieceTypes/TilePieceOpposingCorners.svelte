<script lang="ts">
  import type { TilePiece } from "../CTiles.svelte";
  type Props = {
    tilePiece: TilePiece;
  };
  let { tilePiece }: Props = $props();
  console.log("opposing corners");
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="opposing-corners"
>
  <g clip-path="url(#clip0_25_2)">
    <rect width="100%" height="100%" fill="white" />
    <rect width="100%" height="100%" fill="#DEB887" />
    <rect x="-60" y="-72" width="110" height="120" rx="20" fill="#90EE90" />
    <rect x="50" y="48" width="110" height="110" rx="20" fill="#ADD8E6" />
  </g>
  <defs>
    <clipPath id="clip0_25_2">
      <rect width="100%" height="100%" fill="white" />
    </clipPath>
  </defs>
</svg>
