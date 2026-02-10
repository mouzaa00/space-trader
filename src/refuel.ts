import { MAX_FUEL } from "./gamedata";
import { numberToDollar, type GameState } from "./gamelogic";

export function commandRefuel(gs: GameState, words: string[]) {
  if (words.length !== 2) {
    throw new Error("Usage: refuel <units>");
  }

  const fuelUnits = parseInt(words[1]!);
  if (isNaN(fuelUnits)) {
    throw new Error("Error: units must be number");
  }

  const { fuel, price } = gs.refuel(fuelUnits);
  console.log("Refueling...");
  console.log(`Added ${fuel.toLocaleString()} fuel to your spaceship.`);
  console.log(`Cost: ${numberToDollar(price)}`);
  console.log("");
  const spaceship = gs.getSpaceship();
  console.log(
    `Fuel: ${spaceship.fuel.toLocaleString()} / ${MAX_FUEL.toLocaleString()}`,
  );
  const credits = gs.getCredits();
  console.log(`Credits: ${numberToDollar(credits)}`);
}
