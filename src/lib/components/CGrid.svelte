<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { FarmLand, Plant, Shop, Toolbar, farmLand } from "../GameState/FarmLand.svelte";
  import CTile from "./CTile.svelte";
  import CPlant from "./CPlant.svelte";
  import CShop from "./CShop.svelte";
  import { derive } from "../utils";
  import CToolbar from "./CToolbar.svelte";

  let gridRef: HTMLDivElement;

  onMount(() => {
    window.addEventListener("resize", farmLand.getGridSize.bind(farmLand));
  });

  onDestroy(() => {
    window.removeEventListener("resize", farmLand.getGridSize.bind(farmLand));
  });

  const gridObjectsToRender = $derived(
    farmLand.gridObjects.filter((g) => g).map((g) => {
      const gridObject = g!;
      switch (gridObject.name) {
        case "plant":
          return {
            component: CPlant,
            props: gridObject as Plant,
          };
        case "shop":
          return {
            component: CShop,
            props: gridObject as Shop,
          };
        case "toolbar":
          return {
            component: CToolbar,
            props: gridObject as Toolbar
          }
      }
    })
  );

  function handleGridClick() {
    if (farmLand.interactionMode !== "placing") {
      return;
    }
    const selectedGridObjectIterator = FarmLand.getIteratorFromId(farmLand.selectedGridObjectId!)
    const selectedGridObject = farmLand.gridObjects[selectedGridObjectIterator]!;
    if (selectedGridObject.invalidPlacement) {
      return;
    }
    farmLand.interactionMode = "cursor";
    selectedGridObject.invalidPlacement = false;
    farmLand.selectedGridObjectId = null;
  }

  function handleGridMouseMove(e: MouseEvent) {
    if (farmLand.interactionMode !== "placing") {
      return;
    }
    if (farmLand.selectedGridObjectId === null) {
      return;
    }
    snapObject(e);
  }

  function snapObject(e: MouseEvent) {
    const selectedGridObjectIterator = FarmLand.getIteratorFromId(farmLand.selectedGridObjectId!)
    const selectedGridObject = farmLand.gridObjects[selectedGridObjectIterator]!;
    // x & y of mouse position relative to the grid
    const x = e.clientX;
    const y = e.clientY;

    // x & y mouse position relative to the window
    const relX = x - (window.innerWidth - gridRef.clientWidth) / 2;
    const relY = y - (window.innerHeight - gridRef.clientHeight) / 2;

    // x & y remander from tilesize
    const modX = relX % farmLand.tileSize;
    const modY = relY % farmLand.tileSize;

    // x & y snapped to grid
    const snappedX = relX - modX;
    const snappedY = relY - modY;

    // row & col rounded from the tile count of x & y + 1
    const row = Math.round(snappedY / farmLand.tileSize + 1);
    const col = Math.round(snappedX / farmLand.tileSize + 1);
    const rowDiff = row - selectedGridObject.space.squares[0].row;
    const colDiff = col - selectedGridObject.space.squares[0].col;
    const newSquares = selectedGridObject.space.squares.map((s) => {
      return {
        row: s.row + rowDiff,
        col: s.col + colDiff
      }
    })
    const isOutOfBounds = derive(() => {
      for (const square of newSquares) {
        if (square.row > FarmLand.ROW_COUNT) {
          return true;
        }
        if (square.col > FarmLand.COLUMN_COUNT) {
          return true;
        }
      }
      return false;
    });
    if (isOutOfBounds) {
      return;
    }
    const isOverlapping = derive(() => {
      for (const gridObj of farmLand.gridObjects) {
        if (typeof gridObj === "undefined") {
          continue;
        }
        if (gridObj.id === selectedGridObject.id) {
          continue;
        }
        for (const sqaure1 of gridObj.space.squares) {
          for (const square2 of newSquares) {
            const isSameSpace = sqaure1.col === square2.col && sqaure1.row === square2.row;
            if (isSameSpace) {
              return true;
            }
          }
        }
      }
      return false;
    });
    selectedGridObject.invalidPlacement = isOverlapping;
    selectedGridObject.row = row;
    selectedGridObject.col = col;
    selectedGridObject.space.squares = newSquares;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="grid"
  id="grid"
  style="
    --tile-size: {farmLand.tileSize}px;
    width: {farmLand.gridWidth}px;
    height: {farmLand.gridHeight}px;
  "
  bind:this={gridRef}
  onclick={handleGridClick}
  onmousemove={handleGridMouseMove}
>
  {#each gridObjectsToRender as gridObject}
    <svelte:component this={gridObject.component} obj={gridObject.props as any} />
  {/each}
  {#each farmLand.tiles as tile}
    <CTile {tile} />
  {/each}
</div>

<style>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(32, auto);
    overflow: hidden;
  }
</style>
