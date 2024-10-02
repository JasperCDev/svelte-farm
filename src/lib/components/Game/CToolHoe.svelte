<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { Shop } from "../../GameState/Shop.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SvgHoe from "./SVGHoe.svelte";

    interface Props {
        obj: Shop;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div class="hoe" style="outline: {farmLand.selectedTool === 'hoe' ? '2px solid red' : ''};">
        <SvgHoe />
    </div>
</CGridObject>

<style>
    .hoe {
        height: 100%;
    }
</style>
