<script lang="ts">
    import { FarmLand, farmLand } from "../../GameState/FarmLand.svelte";
    import type { ToolHoe } from "../../GameState/ToolHoe.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SvgHoe from "./SVGHoe.svelte";

    interface Props {
        obj: ToolHoe;
    }
    let { obj }: Props = $props();
    let hoeProgress = $derived(() => {
        return farmLand.tiles.find((tile) => tile.id === farmLand.focusedTileID)?.hoeProgress;
    });
</script>

<CGridObject gridObject={obj}>
    <div class="hoe" style="outline: {farmLand.selectedTool === 'hoe' ? '2px solid red' : ''};">
        <SvgHoe />
    </div>
</CGridObject>
{#if (hoeProgress() ?? 0) > 0}
    <div
        class="tool-progress"
        style="
        top: calc({farmLand.recentMouseDownPosition.row - 2} * var(--tile-size));
        left: calc({farmLand.recentMouseDownPosition.col - 0.5} * var(--tile-size));
        align-items: end;
    "
    >
        <div
            class="bar"
            style="transform: translateY({farmLand.tileSize -
                farmLand.tileSize * (hoeProgress() || 0)}px)"
        ></div>
    </div>
{/if}
{#if farmLand.selectedTool === "hoe"}
    <div
        class="tile-highlight"
        style="
        top: calc({farmLand.mousePosition.row - 1} * var(--tile-size));
        left: calc({farmLand.mousePosition.col - 1} * var(--tile-size));
    "
    ></div>
{/if}

<style>
    .hoe {
        height: 100%;
    }
    .tool-progress {
        width: calc(var(--tile-size) / 2);
        height: var(--tile-size);
        background-color: gray;
        position: absolute;
        z-index: 10;
        overflow: hidden;
    }
    .bar {
        background-color: green;
        height: var(--tile-size);
    }
    .tile-highlight {
        width: var(--tile-size);
        height: var(--tile-size);
        position: absolute;
        border: 2px solid red;

        z-index: 9999;
    }
</style>
