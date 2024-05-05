import { GridObject } from "./GridObject.svelte";
import plantTypes from "./plantTypes";
import type { Points } from "./types";

type PlantName = keyof typeof plantTypes;

export class Plant extends GridObject {
  plantName = $state<PlantName>()!;
  constructor(row: number, col: number, plantName: PlantName) {
    const plantData = plantTypes[plantName];
    const rowDiff = row - plantData.squares[0].row;
    const colDiff = col - plantData.squares[0].col;
    const newSquares = plantData.squares.map((s) => {
      return {
        row: s.row + rowDiff,
        col: s.col + colDiff,
      };
    });

    super(
      row,
      col,
      "plant",
      plantData.width,
      plantData.height,
      newSquares,
      true,
      () => alert(this.plantName)
    );
    this.plantName = plantData.name;
  }
}
