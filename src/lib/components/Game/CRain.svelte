<script>
    import { onMount, onDestroy } from "svelte";
    import Raindrop from "./CRaindrop.svelte";

    // Define state
    let raindrops = getRaindrops();

    // Function to generate random raindrops
    function getRaindrops() {
        const rainDropCount = Math.floor(window.innerWidth / 10);
        const rainDrops = [];

        for (let i = 0; i < rainDropCount; i++) {
            const randomWidth = Math.random() * window.innerWidth;
            const randomHeight = Math.random() * window.innerHeight + window.innerHeight * 0.2;
            rainDrops.push([randomWidth, randomHeight]);
        }

        return rainDrops;
    }
</script>

<svg class="rain">
    {#each raindrops as [randomWidth, randomHeight], indx}
        <Raindrop {randomHeight} {randomWidth} />
    {/each}
</svg>

<style>
    .rain {
        z-index: 999999;
        position: absolute;
        pointer-events: none;
        width: 100vw;
        height: 100vh;
    }
</style>
