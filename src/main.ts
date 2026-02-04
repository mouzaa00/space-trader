import { GameState } from "./gamelogic";

function main() {
  const gs = new GameState();
  console.log(gs.getCurrentPlanet());
  console.log(gs.getSpaceship());
  console.log(gs.getIntendedWealth());
  console.log(gs.getCredits());
}

main();
