import { MAX_FUEL, planets } from "./gamedata";
import { calculateFuelCost, type GameState } from "./gamelogic";

export function commandExplore(gs: GameState, words: string[]) {
  if (words.length !== 1) {
    throw new Error("Usage: explore");
  }

  const planet = gs.getCurrentPlanet();
  const spaceship = gs.getSpaceship();
  const toPlanets = planets.filter((p) => p !== planet);
  console.log(`=== DESTINATIONS FROM ${planet} ===`);
  console.log("");
  for (const toPlanet of toPlanets) {
    const fuel = calculateFuelCost(planet, toPlanet);
    if (fuel > spaceship.fuel) {
      console.log(
        `✗ ${toPlanet} - ${fuel.toLocaleString()} fuel (insufficient)`,
      );
    } else {
      console.log(`✓ ${toPlanet} - ${fuel.toLocaleString()} fuel`);
    }
  }
  console.log("");
  console.log(`Current Fuel: ${spaceship.fuel.toLocaleString()} / ${MAX_FUEL}`);
  console.log("===========================");
}
