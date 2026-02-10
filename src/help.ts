export function commandHelp(words: string[]) {
  if (words.length !== 1) {
    throw new Error("Usage: help");
  }

  console.log("Welcome to Space Trader");
  console.log("Usage:");
  console.log("");
  console.log(" * status: Shows your credits, cargo, fuel, and location");
  console.log(" * market: Displays current planet's market");
  console.log(
    " * buy [item] [quantity]: Purchase goods from current market (e.g, buy metals 5)",
  );
  console.log(
    " * sell [item] [quantity]: Sell goods from cargo (e.g, sell water 2)",
  );
  console.log(" * travel [planet]: Move to a different planet (costs fuel)");
  console.log(" * refuel [units]: Buy fuel at the current planet");
  console.log(" * help: Lists all the available commands");
  console.log(" * quit: Exit the game");
  console.log("");
}
