<script lang="ts">
  import { farmLand } from "../GameState/FarmLand.svelte";
  import type { Tile } from "../GameState/Tile.svelte";

  interface Props {
    tile: Tile;
  }
  let { tile }: Props = $props();
  const isPlacingMode = $derived(farmLand.interactionMode === "placing");
  let color = $derived(isPlacingMode ? "#5ffa5a" : "lightgreen");
  let border = $derived(isPlacingMode ? "1px dashed black" : "1px solid grey");
</script>

<div class="tile" style="background-color: {color}; border: {border};"></div>

<style>
  .tile {
    aspect-ratio: 1;
  }
</style>
