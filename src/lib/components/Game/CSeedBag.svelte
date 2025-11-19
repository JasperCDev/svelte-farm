<script lang="ts">
    import type { SeedBag } from "../../GameState/SeedBag.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SvgSeedBag from "./SVGSeedBag.svelte";

    interface Props {
        obj: SeedBag;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div class="seed_bag">
        <SvgSeedBag />
    </div>
</CGridObject>

<style>
    .seed_bag {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: yellow;
    }
</style>
