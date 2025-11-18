<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Plant } from "../../GameState/Plant.svelte";
    import CGridObject from "./CGridObject.svelte";

    interface Props {
        obj: Plant;
        children: Snippet;
    }
    let { obj, children }: Props = $props();

    function getPlantColor() {
        if (obj.health > 200) {
            return "green";
        }
        if (obj.health > 100) {
            return "yellow";
        }
        return "brown";
    }
</script>

<CGridObject gridObject={obj}>
    <div class="plant" style="color: {getPlantColor()}">
        {@render children()}
    </div>
</CGridObject>
{#each obj.orbs as orb, index (index)}
    <div class="orb" style="top: {orb.y}px; left: {orb.x}px;"></div>
{/each}

<style>
    .orb {
        width: 10px;
        z-index: 999;
        height: 10px;
        background-color: red;
        position: absolute;
    }
</style>
