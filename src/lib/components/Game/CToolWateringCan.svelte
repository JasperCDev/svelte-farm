<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { ToolWateringCan } from "../../GameState/ToolWateringCan.svelte";
    import CGridObject from "./CGridObject.svelte";

    interface Props {
        obj: ToolWateringCan;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div
        class="watering-can"
        style="outline: {farmLand.selectedTool === 'watering_can' ? '2px solid red' : ''};"
    >
        <div class="water" style="height: {farmLand.water}%"></div>
    </div>
</CGridObject>

<style>
    .watering-can {
        height: 80%;
        width: 80%;
        border: 1px solid black;
        position: relative;
    }
    .water {
        height: 100%;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: #3256b8;
    }
</style>
