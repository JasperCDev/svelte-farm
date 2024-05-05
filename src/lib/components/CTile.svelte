<script lang="ts">
  import { farmLand } from "../GameState/FarmLand.svelte";
  import type { Tile } from "../GameState/Tile.svelte";

  interface Props {
    tile: Tile;
  }
  let { tile }: Props = $props();
  let isPlacingMode = $derived(farmLand.interactionMode === "placing");
  function getColor() {
    switch (tile.type) {
      case "SOIL":
        return "burlywood";
      case "WATER":
        return "lightblue";
    }
  }
  let border = $derived(isPlacingMode ? "1px dashed black" : "1px solid grey");
</script>

<div
  class="tile"
  style="background-color: {getColor()}; border: {border};"
></div>

<style>
  .tile {
    aspect-ratio: 1;
  }
</style>
