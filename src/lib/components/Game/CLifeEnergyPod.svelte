<script lang="ts">
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import type { LifeEnergyPod } from "../../GameState/LifeEnergyPod.svelte";

    import CGridObject from "./CGridObject.svelte";
    import SVGSword from "./SVGSword.svelte";

    interface Props {
        obj: LifeEnergyPod;
    }
    let { obj }: Props = $props();

    let isActive = $derived(() => {
        return farmLand.currency.value >= farmLand.currency.rent;
    });
</script>

<CGridObject gridObject={obj}>
    <div class="life_energy_pod">
        <span class={"sword " + (isActive() ? "animate" : "")}>
            <SVGSword color={isActive() ? "blue" : "red"} />
        </span>
        <div
            style="height: {Math.floor(farmLand.currency.value / farmLand.currency.rent) * 100}%"
        ></div>
        <span class="value_label">{farmLand.currency.value}/{farmLand.currency.rent}</span>
    </div>
</CGridObject>

<style>
    @keyframes bobbing {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-15px);
        }
        100% {
            transform: translateY(0);
        }
    }

    .animate {
        animation: bobbing 2s ease-in-out infinite;
    }

    .life_energy_pod {
        display: flex;
        align-items: start;
        justify-content: center;
        height: 100%;
        width: 100%;
        position: relative;
        border: 1px solid red;
    }

    .life_energy_pod div {
        width: 100%;
        position: absolute;
        bottom: 0px;
        left: 0px;
    }

    .value_label {
        font-size: 3vw;
        position: absolute;
        bottom: 0px;
        left: 0px;
        text-align: center;
    }

    .sword {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
