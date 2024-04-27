<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Plant, Shop, farmLand } from "../GameState/FarmLand.svelte";
  import CTile from "./CTile.svelte";
  import CPlant from "./CPlant.svelte";
  import CShop from "./CShop.svelte";

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
            props: g as Plant,
          };
        case "shop":
          return {
            component: CShop,
            props: g as Shop,
          };
      }
    })
  );
</script>

<div
  class="grid"
  id="grid"
  style="
    --tile-size: {farmLand.tileSize}px;
    width: {farmLand.gridWidth}px;
    height: {farmLand.gridHeight}px;
    cursor: {farmLand.interactionMode === "placing" ? "none" : "auto"};
  "
>
  {#each gridObjectsToRender as gridObject}
    <svelte:component this={gridObject.component} obj={gridObject.props as any} />
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
