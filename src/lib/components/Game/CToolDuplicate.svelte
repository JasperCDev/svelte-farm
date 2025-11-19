<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { ToolDuplicate } from "../../GameState/ToolDuplicate.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SvgDuplicate from "./SVGDuplicate.svelte";

    interface Props {
        obj: ToolDuplicate;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div
        class="duplicate"
        style="outline: {farmLand.selectedTool === 'duplicate' ? '2px solid red' : ''};"
    >
        <SvgDuplicate />
    </div>
</CGridObject>

<style>
    .duplicate {
        height: 100%;
    }
</style>
