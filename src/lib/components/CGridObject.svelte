<script lang="ts">
  import type { Snippet } from "svelte";
  import { farmLand } from "../GameState/FarmLand.svelte";
  import type { GridObject } from "../GameState/GridObject.svelte";

  interface Props {
    gridObject: GridObject;
    children: Snippet;
    className?: string;
    handleClick?: (e: MouseEvent) => void;
  }
  let { gridObject, children, className, handleClick }: Props = $props();
  let objectClassName = $derived((className || "") + " object");
  let thisObjectPlacing = $derived(farmLand.selectedGridObjectId === gridObject.id)

  function handleObjectClick(e: MouseEvent) {
    if (farmLand.interactionMode === "placing") {
      return;
    }
    e.stopPropagation();
    switch (farmLand.selectedTool) {
      case "cursor":
        handleClick?.(e);
        return;
      case "mover":
        if (!gridObject.movable) {
          return;
        }
        farmLand.interactionMode = "placing";
        farmLand.selectedGridObjectId = gridObject.id;
        return;
      default:
        const exhaustive: never = farmLand.selectedTool;
    }
  }
  const zIndex = $derived(gridObject.invalidPlacement ? 999 : 1);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
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
  onclick={handleObjectClick}
>
  {#if gridObject.invalidPlacement}
    <div class="overlay" style="z-index: {zIndex + 1}"></div>
  {/if}
  {@render children()}
</div>

<style>
  .object {
    position: absolute;
    z-index: 1;
  }
  .overlay {
    position: absolute;
    background-color: red;
    opacity: 0.7;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
