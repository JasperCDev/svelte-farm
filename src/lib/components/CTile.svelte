<script lang="ts">
  import { farmLand, type Tile } from "../GameState/FarmLand.svelte";

  interface Props {
    tile: Tile;
  }
  let { tile }: Props = $props();
  let color = $derived(farmLand.isPlacingMode ? "#5ffa5a" : "burlywood");
</script>

<div class="tile" style="background-color: {color};"></div>

<style>
  .tile {
    border: 1px solid black;
    aspect-ratio: 1;
  }
</style>
