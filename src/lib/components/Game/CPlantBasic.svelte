<script lang="ts">
    import type { Plant } from "../../GameState/Plant.svelte";
    import CPlant from "./CPlant.svelte";
    import SvgPlantBasic from "./SVGPlantBasic.svelte";

    interface Props {
        obj: Plant;
    }
    let { obj }: Props = $props();
</script>

<CPlant {obj}>
    <div>
        <SvgPlantBasic />
    </div>
</CPlant>

<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>
