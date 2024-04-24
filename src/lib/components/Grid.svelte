<script>
  import { FarmLand, myGrid } from "../GameState/Grid";
  import Tile from "./Tile.svelte";
  const widthPercent = window.innerWidth / 16000000;
  const heightPercent = window.innerHeight / 9000000;
  const smallestPercent = Math.min(widthPercent, heightPercent);
  const gridWidth = Math.round(16000000 * smallestPercent);
  const gridHeight = Math.round(9000000 * smallestPercent);
  const width = gridWidth;
  const height = gridHeight;
  const tileSize = height / FarmLand.ROW_COUNT;
</script>

<div
  class="grid"
  style="--tile-size: {tileSize}px; width: {width}px; height: {height}px"
>
  {#each myGrid.tiles as tile}
    <Tile {tile} />
  {/each}
</div>

<style>
  .grid {
    position: relative;
    aspect-ratio: 16 / 9;
    display: grid;
    grid-template-columns: repeat(32, auto);
    overflow: hidden;
  }
</style>
