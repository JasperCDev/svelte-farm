<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { Shop } from "../../GameState/Shop.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SvgDuplicate from "./SVGDuplicate.svelte";
    import SvgHoe from "./SVGHoe.svelte";

    interface Props {
        obj: Shop;
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
