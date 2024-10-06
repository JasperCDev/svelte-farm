<script>
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import CGrid from "./CGrid.svelte";
    import CRain from "./CRain.svelte";
    function getCursor() {
        if (farmLand.isDragging) {
            return "grab";
        }
        return "auto";
    }
    function getTint() {
        if (farmLand.time.hour > 18 || farmLand.time.hour < 6) {
            return "background-color: purple; opacity: 0.4;";
        }
        return "background-color: orange; opacity: 0.2;";
    }
</script>

<div class="tint" style={getTint()}></div>
{#if farmLand.weather.weather === "raining"}
    <CRain />
{/if}
<div class="game" style="cursor: {getCursor()};">
    <CGrid />
</div>

<style>
    .game {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: black;
    }
    .tint {
        background-color: orange;
        opacity: 0.2;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999999999;
        pointer-events: none;
        transition:
            background-color 5s ease,
            opacity 5s ease;
    }
</style>
