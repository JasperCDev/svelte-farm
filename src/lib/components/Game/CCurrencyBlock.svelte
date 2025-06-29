<script lang="ts">
    import type { CurrencyBlock } from "../../GameState/CurrencyBlock.svelte";
    import type { TimeBlock } from "../../GameState/TimeBlock.svelte";
    import CGridObject from "./CGridObject.svelte";

    interface Props {
        obj: CurrencyBlock;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div><p>{obj.currencyValue}</p></div>
</CGridObject>

<style>
    div {
        container-type: inline-size;
        border: 1px solid red;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
    }
    p {
        font-size: 2vw;
    }
</style>
