import { commandBuy } from "./buy";
import { GameState, getInput } from "./gamelogic";
import { commandMarket } from "./market";
import { commandRefuel } from "./refuel";
import { commandSell } from "./sell";
import { commandStatus } from "./status";
import { commandTravel } from "./travel";

async function main() {
  const gs = new GameState();

  while (true) {
    const words = await getInput();
    const command = words[0];
    if (command === "buy") {
      try {
        commandBuy(gs, words);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else if (command === "sell") {
      try {
        commandSell(gs, words);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else if (command === "travel") {
      try {
        commandTravel(gs, words);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else if (command === "status") {
      try {
        commandStatus(gs, words);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else if (command === "market") {
      try {
        commandMarket(gs, words);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else if (command === "refuel") {
      try {
        commandRefuel(gs, words);
      } catch (err) {
        console.log((err as Error).message);
      }
    }
  }
}

main().catch((err) => {
  console.error(`Fatal Error: ${err}`);
  process.exit(1);
});
