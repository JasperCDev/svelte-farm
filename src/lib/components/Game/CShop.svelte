<script lang="ts">
    import type { Shop } from "../../GameState/Shop.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SvgShop from "./SVGShop.svelte";

    interface Props {
        obj: Shop;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div class="shop">
        <SvgShop />
    </div>
</CGridObject>

<style>
    .shop {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: #a66117;
    }
</style>
