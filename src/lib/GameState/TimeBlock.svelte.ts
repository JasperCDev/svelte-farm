import { derive } from "../utils";
import { farmLand } from "./FarmLand.svelte";
import { GridObject } from "./GridObject.svelte";

export class TimeBlock extends GridObject {
    displayTime = $state<string>("Day 1: 9am");

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
        super.update(timestamp);
        this.displayTime = this.formatTime();
    }

    private formatTime() {
        let formattedDay = farmLand.time.day.toString().padStart(2, "00");
        let formattedHour = derive(() => {
            let h = farmLand.time.hour;
            if (h === 0) {
                h = 12;
            }
            if (h > 12) {
                h = h - 12;
            }
            return h.toString().padStart(2, "00");
        });
        let formattedMinute = farmLand.time.minute.toString().padStart(2, "00");
        return `Day ${formattedDay} ${formattedHour}:${formattedMinute}${
            farmLand.time.hour >= 12 ? "pm" : "am"
        }`;
    }
}
