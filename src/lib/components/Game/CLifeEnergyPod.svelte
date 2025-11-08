<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { LifeEnergyPod } from "../../GameState/LifeEnergyPod.svelte";

    import CGridObject from "./CGridObject.svelte";

    interface Props {
        obj: LifeEnergyPod;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div class="life_energy_pod">
        <div
            style="height: {Math.floor(farmLand.currency.value / farmLand.currency.rent) * 100}%"
        ></div>
        <span>{farmLand.currency.value}/{farmLand.currency.rent}</span>
    </div>
</CGridObject>

<style>
    .life_energy_pod {
        display: flex;
        align-items: flex-end;
        height: 100%;
        background-color: #f0f0f0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: relative;
        background-color: lightblue;
    }

    .life_energy_pod div {
        width: 100%;
        background-color: darkblue;
        position: absolute;
        bottom: 0px;
        left: 0px;
    }

    span {
        font-size: 3vw;
        position: absolute;
        bottom: 0px;
        left: 0px;
    }
</style>
