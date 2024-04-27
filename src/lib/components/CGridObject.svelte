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
  let thisObjectPlacing = $state<boolean>(false);
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
    // x & y of mouse position relative to the grid
      const x = e.clientX;
      const y = e.clientY;

      // x & y mouse position relative to the window
      const relX = x - (window.innerWidth - gridElem.clientWidth) / 2;
      const relY = y - (window.innerHeight - gridElem.clientHeight) / 2;

      // x & y remander from tilesize
      const modX = relX % farmLand.tileSize;
      const modY = relY % farmLand.tileSize;

      // x & y snapped to grid
      const snappedX = relX - modX;
      const snappedY = relY - modY;

      // row & col rounded from the tile count of x & y + 1
      const row = Math.round(snappedY / farmLand.tileSize + 1);
      const col = Math.round(snappedX / farmLand.tileSize + 1);
      console.log({x, y, relX, relY, modX, modY, snappedX, snappedY, row, col})
      const rowDiff = row - gridObject.space.squares[0].row;
      const colDiff = col - gridObject.space.squares[0].column;
      const newSquares = gridObject.space.squares.map((s) => {
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
                console.log("collision! ", newSquares, gridObj.space.squares);
                return true;
              }
            }
          }
        }
        return false;
      })();
      if (!isOverlapping) {
        console.log(row, col)
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
    border: {thisObjectPlacing ? "2px solid red" : "none"};
  "
  on:click={handleObjectClick}
>
  {@render children()}
</div>

<style>
  .object {
    position: absolute;
  }
</style>
