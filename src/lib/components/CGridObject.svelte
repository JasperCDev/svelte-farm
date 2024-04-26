<script lang="ts">
  import type { Snippet } from "svelte";
  import type { GridObject } from "../GameState/FarmLand.svelte";

  interface Props {
    gridObject: GridObject;
    children: Snippet;
  }
  let { gridObject, children }: Props = $props();
</script>

<div
  class="object"
  style="
    top: calc({gridObject.row - 1} * var(--tile-size));
    left: calc({gridObject.column - 1} * var(--tile-size));
    width: calc({gridObject.space.width} * var(--tile-size));
    height: calc({gridObject.space.height} * var(--tile-size));
  "
>
  {@render children()}
</div>

<style>
  .object {
    position: absolute;
    width: var(--tile-size);
    height: var(--tile-size);
    border: 2px solid red;
  }
</style>
