<script lang="ts">
  import type { Tile } from "../GameState/Grid";

  interface Props {
    tile: Tile;
  }
  let { tile }: Props = $props();
  let color = $derived(tile.type === "EMPTY" ? "green" : "red");
</script>

<div class="tile" style="background-color: {color}"></div>

<style>
  .tile {
    border: 1px solid green;
    aspect-ratio: 1;
  }
</style>
