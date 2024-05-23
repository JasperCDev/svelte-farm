<script lang="ts">
    import { farmLand } from "./lib/GameState/FarmLand.svelte";
    import { gameState } from "./lib/GameState/GameState.svelte";
    import CGame from "./lib/components/Game/CGame.svelte";
    import CGrid from "./lib/components/Game/CGrid.svelte";
    import MainMenu from "./lib/components/MainMenu/MainMenu.svelte";

    function getScene() {
        switch (gameState.scene) {
            case "game":
                return CGame;
            case "main menu":
                return MainMenu;
            default:
                let exhaustiveCheck: never = gameState.scene;
        }
    }
</script>

<main class="main">
    <svelte:component this={getScene()} />
</main>

<style>
</style>
