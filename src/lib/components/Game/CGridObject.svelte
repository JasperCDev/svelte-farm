<script lang="ts">
  import type { Snippet } from "svelte";
  import { farmLand } from "../../GameState/FarmLand.svelte";
  import type { GridObject } from "../../GameState/GridObject.svelte";

  interface Props {
    gridObject: GridObject;
    children: Snippet;
    className?: string;
  }
  let { gridObject, children, className }: Props = $props();
  let objectClassName = $derived((className || "") + " object");
  let zIndex = $derived(gridObject.invalidPlacement ? 999 : 20);
  let isDragging = $derived(farmLand.isDragging && farmLand.selectedGridObjectId === gridObject.id);
</script>

<div
  class={objectClassName}
  style="
    top: calc({(isDragging ? gridObject.draggedRow : gridObject.row) - 1} * var(--tile-size));
    left: calc({(isDragging ? gridObject.draggedCol : gridObject.col) - 1} * var(--tile-size));
    width: calc({gridObject.space.width} * var(--tile-size));
    height: calc({gridObject.space.height} * var(--tile-size));
    z-index: {zIndex};
  "
>
  {#if gridObject.invalidPlacement}
    <div class="overlay" style="z-index: {zIndex + 1}"></div>
  {/if}
  {@render children()}
</div>

<style>
  .object {
    position: absolute;
    z-index: 20;
  }
  .overlay {
    position: absolute;
    background-color: red;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
