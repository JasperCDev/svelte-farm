<script lang="ts">
  import type { Tile } from "../GameState/FarmLand.svelte";

  interface Props {
    tile: Tile;
  }
  let { tile }: Props = $props();
  let color = $derived(tile.type === "EMPTY" ? "lightgreen" : "burlywood");
</script>

<div class="tile" style="background-color: {color}"></div>

<style>
  .tile {
    border: 1px solid green;
    aspect-ratio: 1;
  }
</style>
