import { markets } from "./gamedata";
import { numberToDollar, type GameState } from "./gamelogic";

export function commandMarket(gs: GameState, words: string[]) {
  if (words.length !== 1) {
    throw new Error("Usage: market");
  }

  const planet = gs.getCurrentPlanet();
  const credits = gs.getCredits();
  const market = markets[planet];
  console.log(`=== ${planet.toUpperCase()} MARKET ===`);
  console.log("");
  console.log("");
  console.log("Available Goods:");
  console.log(
    `  water    -  ${numberToDollar(market.water.price)}  (${market.water.quantity} available)`,
  );
  console.log(
    `  metals   -  ${numberToDollar(market.metals.price)}  (${market.metals.quantity} available)`,
  );
  console.log(
    `  tech     -  ${numberToDollar(market.tech.price)}  (${market.tech.quantity} available)`,
  );
  console.log(
    `  spices   -  ${numberToDollar(market.spices.price)}  (${market.spices.quantity} available)`,
  );
  console.log(
    `  fuel     -  ${numberToDollar(market.fuel.price)}  (${market.fuel.quantity} available)`,
  );
  console.log("");
  console.log(`Your Credits: ${numberToDollar(credits)}`);
  console.log("==================");
}
