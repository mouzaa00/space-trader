import { GameState, markets } from "./gamelogic";

function main() {
  const gs = new GameState();
  const planet = gs.getCurrentPlanet();
  const credits = gs.getCredits();
  const targetWealth = gs.getTargetWealth();
  console.log("planet:", planet);
  console.log("target wealth:", targetWealth);
  console.log("credits:", credits);
  const spaceship = gs.getSpaceship();
  console.log("Cargo:", spaceship.cargo);
  console.log("Cargo Capacity:", spaceship.cargoCapacity);
  gs.buy("metals", 2);
  console.log(`Buying 2 metals in ${planet} market`);
  console.log("updated credits", gs.getCredits());
  const updatedSpaceship = gs.getSpaceship();
  console.log("Cargo:", updatedSpaceship.cargo);
  console.log("Cargo Capacity:", updatedSpaceship.cargoCapacity);
}

main();
