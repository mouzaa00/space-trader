import { isValidPlanet } from "./gamedata";
import { calculateFuelCost, type GameState } from "./gamelogic";

export function commandTravel(gs: GameState, words: string[]) {
  if (words.length !== 2) {
    throw new Error("Usage: travel <planet>");
  }

  const planet = words[1];
  if (!isValidPlanet(planet)) {
    throw new Error(`Error: ${planet} is not a valid planet`);
  }

  const currentPlanet = gs.getCurrentPlanet();
  const fuel = calculateFuelCost(currentPlanet, planet);
  const spaceShip = gs.getSpaceship();
  if (spaceShip.fuel - fuel < 0) {
    throw new Error(`Not enough fuel to travel to ${planet}`);
  }
  gs.travel(planet, fuel);
  console.log(`Traveled from ${currentPlanet} to ${planet}`);
  console.log(`- ${fuel} consumed, ${spaceShip.fuel} remaining...`);
}
