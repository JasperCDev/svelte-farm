import { Component } from "./Component.svelte";

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
        const dayTime = 1000 * 60 * 5; // 5 minutes
        const msIn15Minutes = dayTime / 24 / 4;
        const timeSinceLastTick = timestamp - this.prevTick;
        const tick = timeSinceLastTick >= msIn15Minutes;
        if (tick) {
            // next minute
            this.minute = this.minute === 45 ? 0 : this.minute + 15;
            // next hour
            if (this.minute === 0) {
                this.hour = this.hour === 23 ? 0 : this.hour + 1;
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
        }
    }
}
