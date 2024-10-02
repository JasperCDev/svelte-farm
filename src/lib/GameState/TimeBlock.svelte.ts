import { derive } from "../utils";
import { GridObject } from "./GridObject.svelte";

type Minute = 0 | 15 | 30 | 45;

export class TimeBlock extends GridObject {
    currentTime = $state<number>(0);
    prevTimestamp = $state<number>(Date.now());
    prevTick = $state<number>(this.prevTimestamp);
    displayTime = $state<string>("Day 1: 9am");

    day = $state<number>(1);
    hour = $state<number>(9);
    minute = $state<number>(0);

    static squares = [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
    ];

    constructor(row: number, col: number) {
        super(row, col, "time_block", 4, 1, TimeBlock.squares, true);
    }

    update(timestamp: number): void {
        let timePassed = timestamp - this.prevTimestamp;
        let previousTime = this.currentTime;
        this.currentTime = this.currentTime + timePassed;
        this.prevTimestamp = previousTime;
        this.displayTime = this.formatTime(this.currentTime);
    }

    formatTime(timestamp: number) {
        const msIn15Minutes = 1000;
        const timeSinceLastTick = timestamp - this.prevTick;
        if (timeSinceLastTick >= msIn15Minutes) {
            this.minute = this.minute === 45 ? 0 : this.minute + 15;
            if (this.minute === 0) {
                this.hour = this.hour === 23 ? 0 : this.hour + 1;
            }
            if (this.hour === 0) {
                this.day += 1;
            }
            this.prevTick = timestamp;
        }
        let formattedDay = this.day.toString().padStart(2, "00");
        let formattedHour = derive(() => {
            let h = this.hour;
            if (h === 0) {
                h = 12;
            }
            if (h > 12) {
                h = h - 12;
            }
            return h.toString().padStart(2, "00");
        });
        let formattedMinute = this.minute.toString().padStart(2, "00");
        return `Day ${formattedDay} ${formattedHour}:${formattedMinute}pm`;
    }
}
