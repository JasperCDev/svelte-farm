export type SceneName = "main menu" | "game";

export class GameState {
    scene = $state<SceneName>("main menu");
}

export let gameState = new GameState();
