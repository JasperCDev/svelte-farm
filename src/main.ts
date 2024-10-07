import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { GridObject } from "./lib/GameState/GridObject.svelte";

let app = mount(App, {
    target: document.getElementById("app")!,
});

export default app;
