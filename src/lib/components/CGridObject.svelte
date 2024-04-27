<script lang="ts">
  import type { Snippet } from "svelte";
  import { farmLand, type GridObject } from "../GameState/FarmLand.svelte";

  interface Props {
    gridObject: GridObject;
    children: Snippet;
    className?: string;
  }
  let { gridObject, children, className }: Props = $props();
  let objectClassName = $derived((className || "") + " object");
  let thisObjectPlacing = false;
  let gridElem: HTMLElement;

  function handleObjectClick() {
    if (farmLand.isPlacingMode) {
      return;
    }
    if (!gridElem) {
      gridElem = document.getElementById("grid")!;
    }
    console.log("gridElem", gridElem)
    farmLand.isPlacingMode = true;
    thisObjectPlacing = true;
    gridElem.addEventListener("mousemove", snapObject);
    requestAnimationFrame(() => {
      gridElem.addEventListener("click", () => {
        farmLand.isPlacingMode = false;
        thisObjectPlacing = false;
        gridElem.removeEventListener("mousemove", snapObject);
        return;
      }, { once: true})
    })
  }
  function snapObject(e: MouseEvent) {
    console.log("snapObject");
    const x = e.clientX;
      const y = e.clientY;
      const relX = x - (window.innerWidth - gridElem.clientWidth) / 2;
      const relY = y - (window.innerHeight - gridElem.clientHeight) / 2;
      const modX = relX % farmLand.tileSize;
      const modY = relY % farmLand.tileSize;
      const snappedX = relX - modX;
      const snappedY = relY - modY;
      const row = Math.floor(snappedY / farmLand.tileSize + 1);
      const col = Math.floor(snappedX / farmLand.tileSize + 1);
      const newSquares = gridObject.space.squares.map((s) => {
        const rowDiff = row - s.row;
        const colDiff = col - s.column;
        return {
          row: s.row + rowDiff,
          column: s.column + colDiff
        }
      })
      const isOverlapping = (() => {
        for (const gridObj of farmLand.gridObjects) {
          if (gridObj.id === gridObject.id) {
            continue;
          }
          for (const sqaure1 of gridObj.space.squares) {
            for (const square2 of newSquares) {
              const isSameSpace = sqaure1.column === square2.column && sqaure1.row === square2.row;
              if (isSameSpace) {
                return true;
              }
            }
          }
        }
        return false;
      })();
      if (!isOverlapping) {
        gridObject.row = row;
        gridObject.column = col;
        gridObject.space.squares = newSquares
      }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore deprecated-event-handler -->
<div
  class={objectClassName}
  style="
    top: calc({gridObject.row - 1} * var(--tile-size));
    left: calc({gridObject.column - 1} * var(--tile-size));
    width: calc({gridObject.space.width} * var(--tile-size));
    height: calc({gridObject.space.height} * var(--tile-size));
  "
  on:click={handleObjectClick}
>
  {@render children()}
</div>

<style>
  .object {
    position: absolute;
    border: 2px solid red;
  }
</style>
