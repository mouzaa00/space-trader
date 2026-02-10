import { commandBuy } from "./buy";
import { commandExplore } from "./explore";
import { GameState, getInput } from "./gamelogic";
import { commandHelp } from "./help";
import { commandMarket } from "./market";
import { commandQuit } from "./quit";
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
    } else if (command === "help") {
      try {
        commandHelp(words);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else if (command === "explore") {
      try {
        commandExplore(gs, words);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else if (command === "quit") {
      try {
        commandQuit(words);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else {
      console.log("Unknown command run help");
    }
  }
}

main().catch((err) => {
  console.error(`Fatal Error: ${err}`);
  process.exit(1);
});
