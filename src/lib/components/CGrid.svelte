<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Plant, farmLand } from "../GameState/FarmLand.svelte";
  import CTile from "./CTile.svelte";
  import CPlant from "./CPlant.svelte";

  onMount(() => {
    window.addEventListener("resize", farmLand.getGridSize.bind(farmLand));
  });

  onDestroy(() => {
    window.removeEventListener("resize", farmLand.getGridSize.bind(farmLand));
  });

  const gridObjectsToRender = $derived(
    farmLand.gridObjects.map((g) => {
      switch (g.name) {
        case "plant":
          return {
            component: CPlant,
            props: {
              plant: g as Plant,
            },
          };
      }
    })
  );
</script>

<div
  class="grid"
  style="--tile-size: {farmLand.tileSize}px; width: {farmLand.gridWidth}px; height: {farmLand.gridHeight}px"
>
  {#each gridObjectsToRender as gridObject}
    <svelte:component this={gridObject.component} {...gridObject.props} />
  {/each}
  {#each farmLand.tiles as tile}
    <CTile {tile} />
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
