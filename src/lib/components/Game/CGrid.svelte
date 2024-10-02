<script context="module">
    export const GRID_OBJECT_MAP = {
        plant_basic: CPlantBasic,
        shop: CShop,
        tool_mover: CToolMover,
        time_block: CTimeBlock,
    };
</script>

<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import CPlantBasic from "./CPlantBasic.svelte";
    import CShop from "./CShop.svelte";
    import CTiles from "./CTiles.svelte";
    import CTileTextures from "./CTileTextures.svelte";
    import CToolMover from "./CToolMover.svelte";
    import CTimeBlock from "./CTimeBlock.svelte";

    onMount(() => {
        window.addEventListener("resize", farmLand.getGridSize.bind(farmLand));
    });

    onDestroy(() => {
        window.removeEventListener("resize", farmLand.getGridSize.bind(farmLand));
    });

    let gridObjectsToRender = $derived(
        farmLand.gridObjects.filter((g) => typeof g !== "undefined"),
    );
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
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    "
    onclick={farmLand.handleGridClick}
    onmousemove={farmLand.handleGridMouseMove}
    onmousedown={farmLand.handleGridMouseDown}
    onmouseup={farmLand.handleGridMouseUp}
>
    <CTiles />
    <CTileTextures />
    {#each gridObjectsToRender as gridObject}
        <svelte:component this={GRID_OBJECT_MAP[gridObject.name]} obj={gridObject} />
    {/each}
</div>

<style>
    .grid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(32, auto);
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }
</style>
