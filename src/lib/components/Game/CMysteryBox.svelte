<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { SeedBag } from "../../GameState/SeedBag.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SVGBox from "./SVGBox.svelte";

    interface Props {
        obj: SeedBag;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div class="mystery-box">
        <SVGBox />
    </div>
</CGridObject>

<style>
</style>
