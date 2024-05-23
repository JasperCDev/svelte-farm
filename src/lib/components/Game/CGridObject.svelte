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
  let thisObjectPlacing = $derived(farmLand.selectedGridObjectId === gridObject.id)
  let zIndex = $derived(gridObject.invalidPlacement ? 999 : 20);
</script>

<div
  class={objectClassName}
  style="
    top: calc({gridObject.row - 1} * var(--tile-size));
    left: calc({gridObject.col - 1} * var(--tile-size));
    width: calc({gridObject.space.width} * var(--tile-size));
    height: calc({gridObject.space.height} * var(--tile-size));
    border: {thisObjectPlacing ? "2px solid red" : "none"};
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
