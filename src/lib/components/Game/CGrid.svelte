<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { FarmLand, farmLand } from "../../GameState/FarmLand.svelte";
  import CTile from "./CTile.svelte";
  import CPlant from "./CPlant.svelte";
  import CShop from "./CShop.svelte";
  import CToolbar from "./CToolbar.svelte";
  import { Plant } from "../../GameState/Plant.svelte";
  import { Shop } from "../../GameState/Shop.svelte";
  import { Toolbar } from "../../GameState/Toolbar.svelte";
  import CTiles from "./CTiles.svelte";

  onMount(() => {
    window.addEventListener("resize", farmLand.getGridSize.bind(farmLand));
  });

  onDestroy(() => {
    window.removeEventListener("resize", farmLand.getGridSize.bind(farmLand));
  });

  let gridObjectsToRender = $derived(
    farmLand.gridObjects.filter((g) => g).map((g) => {
      let gridObject = g!;
      switch (gridObject.name) {
        case "plant":
          return {
            component: CPlant,
            props: gridObject as Plant,
          };
        case "shop":
          return {
            component: CShop,
            props: gridObject as Shop,
          };
        case "toolbar":
          return {
            component: CToolbar,
            props: gridObject as Toolbar
          }
      }
    })
  );

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="grid"
  id="grid"
  style="
    --tile-size: {farmLand.tileSize}px;
    width: {farmLand.gridWidth}px;
    height: {farmLand.gridHeight}px;
  "
  onclick={farmLand.handleGridClick}
  onmousemove={farmLand.handleGridMouseMove}
>
  {#each gridObjectsToRender as gridObject}
    <svelte:component this={gridObject.component} obj={gridObject.props as any} />
  {/each}
  <!-- {#each farmLand.tiles as tile}
    <CTile {tile} />
  {/each} -->
  <CTiles />
</div>

<style>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(32, auto);
    overflow: hidden;
  }
</style>
