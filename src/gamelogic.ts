import readline from "readline";
import {
  markets,
  planets,
  type CargoItem,
  type Planet,
  type SpaceShip,
} from "./gamedata";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function getInput(
  prompt: string = "Space Trader > ",
): Promise<string[]> {
  return new Promise((res) => {
    rl.question(prompt, (answer) => {
      const trimmed = answer.trim();
      const words = trimmed.split(/\s+/); // Split the input on 1 or plus whitespaces
      res(words);
    });
  });
}

function selectRandomPlanet(planets: Planet[]): Planet {
  const index = Math.floor(Math.random() * planets.length);
  const planet = planets[index];

  if (!planet) {
    throw new Error("Unknown planet");
  }
  return planet;
}

function generateNumber(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MAX_FUEL = 25_000;
const MIN_FUEL = 15_000;
const MAX_WEALTH = 10_000;
const MIN_WEALTH = 8_000;
const MAX_CARGO_CAPACITY = 30;
const MAX_CREDITS = 500;
const MIN_CREDITS = 200;

export class GameState {
  private currentPlanet: Planet;
  private spaceship: SpaceShip;
  private targetWealth: number;
  private credits: number;

  constructor() {
    this.currentPlanet = selectRandomPlanet(planets);
    this.spaceship = {
      fuel: generateNumber(MAX_FUEL, MIN_FUEL),
      cargo: {
        water: 0,
        metals: 0,
        tech: 0,
        spices: 0,
      },
      cargoCapacity: 0,
      maxCargoCapacity: MAX_CARGO_CAPACITY,
    };
    this.targetWealth = generateNumber(MAX_WEALTH, MIN_WEALTH);
    this.credits = generateNumber(MAX_CREDITS, MIN_CREDITS);
  }

  getCurrentPlanet() {
    return this.currentPlanet;
  }

  getSpaceship() {
    return this.spaceship;
  }

  getTargetWealth() {
    return this.targetWealth;
  }

  getCredits() {
    return this.credits;
  }

  buy(good: CargoItem, quantity: number) {
    const market = markets[this.currentPlanet];
    const marketItem = market[good];

    if (marketItem.quantity < quantity) {
      throw new Error(`Not enough quantity in ${this.currentPlanet} market`);
    }
    if (this.credits < marketItem.price * quantity) {
      throw new Error("Not enough credits");
    }
    // Check if we exceeded cargo max capacity
    if (
      this.spaceship.cargoCapacity + quantity >
      this.spaceship.maxCargoCapacity
    ) {
      throw new Error("Not enough cargo capacity");
    }

    this.spaceship.cargo[good] += quantity;
    this.spaceship.cargoCapacity += quantity;
    this.credits -= marketItem.price * quantity;
  }

  sell(good: CargoItem, quantity: number) {
    const market = markets[this.currentPlanet];
    const marketItem = market[good];

    // Check if we have enough quantity of the item
    if (this.spaceship.cargo[good] < quantity) {
      throw new Error(`Not enough ${good} quantity`);
    }
    this.spaceship.cargo[good] -= quantity;
    this.spaceship.cargoCapacity -= quantity;
    this.credits += marketItem.price * quantity;
  }
}
