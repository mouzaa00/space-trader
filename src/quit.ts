export function commandQuit(words: string[]) {
  if (words.length !== 1) {
    throw new Error("Usage: quit");
  }

  console.log("I hate this game! (╯°□°)╯︵ ┻━┻");
  process.exit(0);
}
