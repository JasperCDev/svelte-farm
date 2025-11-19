<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { ToolHoe } from "../../GameState/ToolHoe.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SvgHoe from "./SVGHoe.svelte";

    interface Props {
        obj: ToolHoe;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div class="hoe" style="outline: {farmLand.selectedTool === 'hoe' ? '2px solid red' : ''};">
        <SvgHoe />
    </div>
</CGridObject>
<div
    class="tool-progress"
    style="
        top: calc({farmLand.recentMouseDownPosition.row - 2} * var(--tile-size));
        left: calc({farmLand.recentMouseDownPosition.col - 0.5} * var(--tile-size));
        height: calc(var(--tile-size) * {farmLand.se});
    "
></div>

<style>
    .hoe {
        height: 100%;
    }
    .tool-progress {
        width: calc(var(--tile-size) / 2);
        height: var(--tile-size);
        background-color: green;
        position: absolute;
        z-index: 10;
    }
</style>
