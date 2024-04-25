<script>
  import { onDestroy, onMount } from "svelte";
  import { farmLand } from "../GameState/FarmLand.svelte";
  import Tile from "./Tile.svelte";
  import Plant from "./Plant.svelte";

  onMount(() => {
    window.addEventListener("resize", farmLand.getGridSize.bind(farmLand));
  });

  onDestroy(() => {
    window.removeEventListener("resize", farmLand.getGridSize.bind(farmLand));
  });
</script>

<div
  class="grid"
  style="--tile-size: {farmLand.tileSize}px; width: {farmLand.gridWidth}px; height: {farmLand.gridHeight}px"
>
  {#each farmLand.plants as plant}
    <Plant {plant} />
  {/each}
  {#each farmLand.tiles as tile}
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
