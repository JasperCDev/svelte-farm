import type { ZeroThruFour } from "../components/Game/CTiles.svelte";
import { moveTowards } from "../utils";
import { FarmLand, farmLand } from "./FarmLand.svelte";
import type { Point } from "./types";

export class Disease {
    public orbs = $state<Point[]>([]);
    constructor() {
        window.addEventListener("tick", this.onTick);
    }

    update() {
        for (let i = 0; i < this.orbs.length; i++) {
            let orb = this.orbs[i];

            const { x, y } = moveTowards(orb.x, orb.y, targetX, targetY, 2);

            orb.x = x;
            orb.y = y;

            if (x === targetX && y === targetY) {
                this.removeOrb();
            }
        }
    }

    onTick(e: EventListener["arguments"]) {
        if (farmLand.time.hour === 0 && farmLand.time.minute === 0) {
            for (let i = 0; i < farmLand.currency.rent / 10; i++) {
                const v = Math.floor(Math.random() * 4) as ZeroThruFour;
                const newOrbs = [];
                switch (v) {
                    case 0:
                        newOrbs.push({
                            row: 0,
                            col: Math.floor(Math.random() * FarmLand.COL_COUNT),
                        });
                        break;
                    case 1:
                        newOrbs.push({
                            row: Math.floor(Math.random() * FarmLand.ROW_COUNT),
                            col: 0,
                        });
                        break;
                    case 2:
                        newOrbs.push({
                            row: FarmLand.ROW_COUNT - 1,
                            col: Math.floor(Math.random() * FarmLand.COL_COUNT),
                        });
                    case 3:
                        newOrbs.push({
                            row: Math.floor(Math.random() * FarmLand.ROW_COUNT),
                            col: FarmLand.COL_COUNT - 1,
                        });
                }
            }
        }
    }
}
