<script>
    import { gameState } from "../../GameState/GameState.svelte";
</script>

<div class="main-menu">
    <h1 style="font-size: 64px;">Serenity Farm</h1>
    <div class="stack">
        <button
            style="font-size: 48px; padding: 1rem; cursor: pointer;"
            onclick={() => (gameState.scene = "game")}>Start</button
        >
    </div>
</div>

<style>
    .main-menu {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
    }
    .stack {
        display: flex;
        flex-direction: column;
    }
</style>
