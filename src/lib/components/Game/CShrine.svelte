<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { Shrine } from "../../GameState/Shrine.svelte";
    import type { TimeBlock } from "../../GameState/TimeBlock.svelte";
    import CGridObject from "./CGridObject.svelte";

    interface Props {
        obj: Shrine;
    }
    let { obj }: Props = $props();
    let frac = $derived(Math.min(farmLand.currency.value / farmLand.currency.rent, 1));
</script>

<CGridObject gridObject={obj}>
    <div class="flex">
        <div class="box">
            <div
                class="progress"
                style="background-color: {frac === 1 ? 'green' : 'red'}; height: {frac * 100}%"
            ></div>
        </div>
        <div class="row">
            <h1>{farmLand.currency.value}</h1>
            <h3>/{farmLand.currency.rent}</h3>
        </div>
    </div>
</CGridObject>

<style>
    .flex {
        container-type: inline-size;
        border: 1px solid red;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 1rem;
    }
    .row {
        display: flex;
        flex-direction: row;
    }
    .box {
        width: 40%;
        height: 55%;
        border: 1px solid black;
        position: relative;
    }

    .progress {
        width: 100%;
        height: 50%;
        position: absolute;
        bottom: 0;
    }
</style>
