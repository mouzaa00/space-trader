import { MAX_FUEL } from "./gamedata";
import type { GameState } from "./gamelogic";

export function commandStatus(gs: GameState, words: string[]) {
  if (words.length !== 1) {
    throw new Error("Usage: status");
  }

  const credits = gs.getCredits();
  const location = gs.getCurrentPlanet();
  const spaceship = gs.getSpaceship();
  const targetWealth = gs.getTargetWealth();
  const progress = (credits / targetWealth) * 100;
  console.log("");
  console.log("=== SPACE TRADER STATUS ===");
  console.log("");
  console.log(`Location: ${location}`);
  console.log(`Credits: ${numberToDollar(credits)}`);
  console.log("");
  console.log("--- Spaceship ---");
  console.log(
    `Fuel: ${spaceship.fuel.toLocaleString()} / ${MAX_FUEL.toLocaleString()}`,
  );
  console.log(
    `Cargo: ${spaceship.cargoCapacity} / ${spaceship.maxCargoCapacity}`,
  );
  console.log("");
  console.log("Current Cargo:");
  let count = 0;
  for (const [cargoItem, value] of Object.entries(spaceship.cargo)) {
    if (value > 0) {
      console.log(` - ${cargoItem}: ${value}`);
    } else {
      count++;
    }
  }
  // A hacky way to print a helpful message if the cargo is empty
  if (count === 4) {
    console.log("Empty cargo!");
  }
  console.log("");
  console.log("--- Mission ---");
  console.log(`Target Wealth: ${numberToDollar(targetWealth)}`);
  console.log(
    `Progress: ${progress.toFixed(2)}% (${numberToDollar(targetWealth - credits)} remaining)`,
  );
}

function numberToDollar(number: number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
