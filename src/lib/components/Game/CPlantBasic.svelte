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
    <SvgPlantBasic />
</CGridObject>
