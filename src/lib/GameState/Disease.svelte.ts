import type { ZeroThruFour } from "../components/Game/CTiles.svelte";
import { moveTowards } from "../utils";
import { FarmLand, farmLand } from "./FarmLand.svelte";
import { Orb } from "./Plant.svelte";
import type { Point } from "./types";

export class Disease {
    public orbs = $state<Orb[]>([]);
    constructor() {
        this.onTick = this.onTick.bind(this);
        window.addEventListener("tick", this.onTick);
    }

    update() {
        let targetX = farmLand.energyPodPosition.col * farmLand.tileSize + farmLand.tileSize / 2;
        let targetY = farmLand.energyPodPosition.row * farmLand.tileSize + farmLand.tileSize / 2;
        for (let i = 0; i < this.orbs.length; i++) {
            let orb = this.orbs[i];

            const { x, y } = moveTowards(orb.x, orb.y, targetX, targetY, 2);

            orb.x = x;
            orb.y = y;

            if (x === targetX && y === targetY) {
                this.orbs = this.orbs.filter((o) => o.id !== orb.id);
                farmLand.currency.value -= 10;
                if (farmLand.currency.value <= 0) {
                  farmLand.isGameOver = true;
                  alert('game over')
                }
            }
        }
    }

    removeOrb() {}

    onTick(e: EventListener["arguments"]) {
        if (farmLand.time.hour === 0 && farmLand.time.minute === 0) {
            const newOrbs: Orb[] = [];
            for (let i = 0; i < farmLand.currency.rent / 10; i++) {
                const v = Math.floor(Math.random() * 4) as ZeroThruFour;
                switch (v) {
                    case 0:
                        newOrbs.push(new Orb(0, Math.floor(Math.random() * FarmLand.COL_COUNT)));

                        break;
                    case 1:
                        newOrbs.push(new Orb(Math.floor(Math.random() * FarmLand.ROW_COUNT), 0));

                        break;
                    case 2:
                        newOrbs.push(
                            new Orb(
                                FarmLand.ROW_COUNT - 1,
                                Math.floor(Math.random() * FarmLand.COL_COUNT),
                            ),
                        );
                        break;
                    case 3:
                        newOrbs.push(
                            new Orb(
                                Math.floor(Math.random() * FarmLand.ROW_COUNT),
                                FarmLand.COL_COUNT - 1,
                            ),
                        );
                        break;
                }
            }
            this.orbs = newOrbs;
        }
    }
}
