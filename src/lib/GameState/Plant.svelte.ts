import { GridObject } from "./GridObject.svelte";
import plantTypes from "./plantTypes";
import type { Points } from "./types";

type PlantName = keyof typeof plantTypes;

export class Plant extends GridObject {
  plantName = $state<PlantName>()!;
  constructor(row: number, col: number, plantName: PlantName) {
    const plantData = plantTypes[plantName];
    super(
      row,
      col,
      "plant",
      plantData.width,
      plantData.height,
      plantData.squares.slice(0),
      true
    );
    this.plantName = plantData.name;
  }
}
