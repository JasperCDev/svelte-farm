import { Component } from "./Component.svelte";
import { farmLand } from "./FarmLand.svelte";

type WeatherName = "raining" | "default";

export class Weather extends Component {
    weather = $state<WeatherName>("raining");
    update(timestamp: number): void {
        const isNight = farmLand.time.hour > 18 || farmLand.time.hour < 6;
        if (this.weather !== "raining" && isNight && Math.random() > 0.5) {
            this.weather = "raining";
        }
        if (!isNight && this.weather === "raining") {
            this.weather = "default";
        }
    }
}
