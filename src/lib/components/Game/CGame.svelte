<script>
    import { farmLand } from "../../GameState/FarmLand.svelte";
    import CGrid from "./CGrid.svelte";
    function getCursor() {
        if (farmLand.isDragging) {
            return "grab";
        }
        return "auto";
    }
</script>

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
</style>
