<script lang="ts">
    import type { MysteryBox } from "../../GameState/MysteryBox.svelte";
    import type { PlantBag } from "../../GameState/PlantBag.svelte";
    import CGridObject from "./CGridObject.svelte";

    interface Props {
        obj: PlantBag;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div class="plant-bag">
        PLANT BAG
    </div>
</CGridObject>

<style>
</style>
