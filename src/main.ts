import { commandBuy } from "./buy";
import { commandExplore } from "./explore";
import { GameState, getInput, printWelcome } from "./gamelogic";
import { commandHelp } from "./help";
import { commandMarket } from "./market";
import { commandQuit } from "./quit";
import { commandRefuel } from "./refuel";
import { commandSell } from "./sell";
import { commandStatus } from "./status";
import { commandTravel } from "./travel";

async function main() {
  const gs = new GameState();
  printWelcome({
    planet: gs.getCurrentPlanet(),
    credits: gs.getCredits(),
    targetWealth: gs.getTargetWealth(),
    fuel: gs.getSpaceship().fuel,
  });

  while (true) {
    const words = await getInput();
    const command = words[0];
    if (command === "buy") {
      try {
        commandBuy(gs, words);
        const result = gs.checkGameEnd();
        if (result.gameOver) {
          console.log(result.message);
          process.exit(0);
        }
      } catch (err) {
        console.log((err as Error).message);
      }
    } else if (command === "sell") {
      try {
        commandSell(gs, words);
        const result = gs.checkGameEnd();
        if (result.gameOver) {
          console.log(result.message);
          process.exit(0);
        }
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
        const result = gs.checkGameEnd();
        if (result.gameOver) {
          console.log(result.message);
          process.exit(0);
        }
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
