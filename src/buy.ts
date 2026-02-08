import { isValidCargoItem } from "./gamedata";
import type { GameState } from "./gamelogic";

export function commandBuy(gs: GameState, words: string[]) {
  if (words.length !== 3) {
    throw new Error("Usage: buy <cargo_item> <quantity>");
  }

  const cargoItem = words[1];
  if (!isValidCargoItem(cargoItem)) {
    throw new Error(`Error: ${cargoItem} is not a valid cargo item`);
  }

  const quantity = parseInt(words[2]!);
  if (isNaN(quantity)) {
    throw new Error(`Error: quantity must be a number`);
  }

  gs.buy(cargoItem, quantity);
  console.log(
    `You bought ${quantity} of ${cargoItem} in ${gs.getCurrentPlanet()} market`,
  );
}
