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

{#if farmLand.isGameOver}
    <div>GAME OVER</div>
{:else}
    <div class="tint" style={getTint()}></div>
    {#if farmLand.time.weather === "raining"}
        <CRain />
    {/if}
    <div class="game" style="cursor: {getCursor()};">
        <div class="flex">
            <div class="grid-wrapper">
                <CGrid />
            </div>
            <div class="row">
                <div>ONE</div>
                <div>TWO</div>
                <div>THREE</div>
            </div>
        </div>
    </div>
{/if}

<style>
    .flex {
        display: grid;
        grid-template-rows: 8fr 2fr;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
    }
    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 20%;
    }
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
