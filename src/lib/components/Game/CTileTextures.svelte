<script>
    import { farmLand } from "../../GameState/FarmLand.svelte";
</script>

{#each farmLand.tiles as tile}
    <div class="tile-texture"></div>
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

    .tile-texture:hover {
        /* border: 2px solid red; */
        /* border-radius: 30%; */
    }
</style>
