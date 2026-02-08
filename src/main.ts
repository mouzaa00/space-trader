import { commandBuy } from "./buy";
import { GameState, getInput } from "./gamelogic";

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
    }
  }
}

main().catch((err) => {
  console.error(`Fatal Error: ${err}`);
  process.exit(1);
});
