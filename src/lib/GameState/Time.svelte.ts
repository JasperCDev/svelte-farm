import { Component } from "./Component.svelte";
import { farmLand } from "./FarmLand.svelte";

type WeatherName = "raining" | "default";

export class Time extends Component {
    currentTime = $state<number>(0);
    prevTimestamp = $state<number>(0);
    prevTick = $state<number>(0);

    day = $state<number>(1);
    hour = $state<number>(9);
    minute = $state<number>(0);

    init = false;
    weather = $state<WeatherName>("default");

    constructor() {
        super();
    }

    update(timestamp: number): void {
        if (!this.init) {
            this.prevTimestamp = timestamp;
            this.prevTick = timestamp;
            this.init = true;
            return;
        }
        let timePassed = timestamp - this.prevTimestamp;
        let previousTime = this.currentTime;
        this.currentTime = this.currentTime + timePassed;
        this.prevTimestamp = previousTime;
        let dayTime = 1000 * 60 * 5; // 5 minutes
        let msIn15Minutes = dayTime / 24 / 4;
        let timeSinceLastTick = timestamp - this.prevTick;
        let tick = timeSinceLastTick >= msIn15Minutes;
        if (tick) {
            this.minute = this.minute === 45 ? 0 : this.minute + 15;
            // next hour
            if (this.minute === 0) {
                this.hour = this.hour === 23 ? 0 : this.hour + 1;
            }
            if (this.minute === 0 && this.hour === 0) {
                farmLand.spawnDisease();
            }
            if (this.hour === 19 && Math.random() > 0.8) {
                this.weather = "raining";
            }
            if (this.hour === 6) {
                this.weather = "default";
            }
            // next day
            if (this.hour === 0 && this.minute === 0) {
                this.day += 1;
            }
            this.prevTick = timestamp;
            const tickEvent = new CustomEvent("tick", {
                detail: {
                    day: this.day,
                    hour: this.hour,
                    minute: this.minute,
                },
            });
            window.dispatchEvent(tickEvent);
        }
    }
}
