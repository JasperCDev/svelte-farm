<script lang="ts">
    import type { Plant } from "../../GameState/Plant.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SvgPlantBasic from "./SVGPlantBasic.svelte";

    interface Props {
        obj: Plant;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div>
        <SvgPlantBasic />
    </div>
</CGridObject>

<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>
