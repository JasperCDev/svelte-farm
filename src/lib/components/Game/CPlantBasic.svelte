<script lang="ts">
    import type { Plant } from "../../GameState/Plant.svelte";
    import CPlant from "./CPlant.svelte";
    import SVGBean from "./SVGBean.svelte";
    import SVGPlantBasic from "./SVGPlantBasic.svelte";
    import SvgPlantBasic from "./SVGPlantBasic.svelte";
    import SVGSeedBag from "./SVGSeedBag.svelte";

    interface Props {
        obj: Plant;
    }
    let { obj }: Props = $props();
</script>

<CPlant {obj}>
    <div>
        {#if obj.stage === "seed"}
            <SVGBean />
        {:else}
            <SVGPlantBasic />
        {/if}
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
