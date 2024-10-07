<script>
    import { farmLand } from "../../GameState/FarmLand.svelte";
</script>

{#each farmLand.tiles as tile}
    <div class="tile-texture soil-moisture" style="opacity: {tile.soilMoisture}"></div>
{/each}

<style>
    .tile-texture {
        width: var(--tile-size);
        height: var(--tile-size);
        /* background-color: red;
        opacity: 0.2; */
        z-index: 20;
        /* border: 1px solid black; */
        user-select: none;
    }

    .tile-texture.soil-moisture {
        background-color: #75450d;
    }
</style>
