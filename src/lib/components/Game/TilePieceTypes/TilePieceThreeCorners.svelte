<script lang="ts">
  import type { TilePiece } from "../CTiles.svelte";
  type Props = {
    tilePiece: TilePiece;
  };
  let { tilePiece }: Props = $props();
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="three-corners"
>
  <g clip-path="url(#clip0_23_2)">
    <rect
      width="100"
      height="100"
      transform="matrix(-1 0 0 -1 100 100)"
      fill="white"
    />
    <rect
      x="100"
      y="101"
      width="100"
      height="100"
      transform="rotate(-180 100 101)"
      fill="#DEB887"
    />
    <rect
      x="160"
      y="172"
      width="110"
      height="120"
      rx="20"
      transform="rotate(-180 160 172)"
      fill="#ADD8E6"
    />
    <rect
      x="50"
      y="52"
      width="110"
      height="110"
      rx="20"
      transform="rotate(-180 50 52)"
      fill="#90EE90"
    />
    <rect
      x="160"
      y="52"
      width="110"
      height="110"
      rx="20"
      transform="rotate(-180 160 52)"
      fill="#808080"
    />
  </g>
  <defs>
    <clipPath id="clip0_23_2">
      <rect
        width="100"
        height="100"
        fill="white"
        transform="matrix(-1 0 0 -1 100 100)"
      />
    </clipPath>
  </defs>
</svg>
