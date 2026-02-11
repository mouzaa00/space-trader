import { isValidCargoItem } from "./gamedata";
import type { GameState } from "./gamelogic";

export function commandSell(gs: GameState, words: string[]) {
  if (words.length !== 3) {
    throw new Error("Usage: sell <cargo_item> <quantity>");
  }

  const cargoItem = words[1];
  if (!isValidCargoItem(cargoItem)) {
    throw new Error(`Error: ${cargoItem} is not a valid cargo item`);
  }

  const quantity = parseInt(words[2]!);
  if (isNaN(quantity) || quantity <= 0) {
    throw new Error(`Error: quantity must be a positive number`);
  }

  gs.sell(cargoItem, quantity);
  console.log(
    `You sold ${quantity} ${cargoItem} to ${gs.getCurrentPlanet()} market`,
  );
}
