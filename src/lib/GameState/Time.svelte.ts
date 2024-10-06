import { Component } from "./Component.svelte";

export class Time extends Component {
    currentTime = $state<number>(0);
    prevTimestamp = $state<number>(0);
    prevTick = $state<number>(0);

    day = $state<number>(1);
    hour = $state<number>(9);
    minute = $state<number>(0);

    init = false;

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
        const msIn15Minutes = 1000;
        const timeSinceLastTick = timestamp - this.prevTick;
        const tick = timeSinceLastTick >= msIn15Minutes;
        if (tick) {
            this.minute = this.minute === 45 ? 0 : this.minute + 15;
            if (this.minute === 0) {
                this.hour = this.hour === 23 ? 0 : this.hour + 1;
            }
            if (this.hour === 0 && this.minute === 0) {
                this.day += 1;
            }
            this.prevTick = timestamp;
        }
    }
}
