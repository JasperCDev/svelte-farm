<script>
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import CGrid from "./CGrid.svelte";
    function getCursor() {
        if (farmLand.isDragging) {
            return "grab";
        }
        return "auto";
    }
    function getTint() {
        if (farmLand.time.hour > 18 || farmLand.time.hour < 6) {
            return "purple";
        }
        return "orange";
    }
</script>

<div class="tint" style="background-color: {getTint()}"></div>
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
            background-color 1s ease,
            tint 1s ease;
    }
</style>
