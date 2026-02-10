import readline from "readline";
import {
  FUEL_CONVERTION_RATE,
  markets,
  MAX_CARGO_CAPACITY,
  MAX_CREDITS,
  MAX_FUEL,
  MAX_WEALTH,
  MIN_CREDITS,
  MIN_FUEL,
  MIN_WEALTH,
  planetDistances,
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

export function calculateFuelCost(from: Planet, to: Planet): number {
  const distance = Math.abs(planetDistances[from] - planetDistances[to]);
  const baseFuelPerUnit = 1000; // fuel per distance unit
  return distance * baseFuelPerUnit;
}

export function numberToDollar(number: number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

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

  travel(planet: Planet, fuel: number) {
    // Reduce fuel required to travel to a specific planet
    this.spaceship.fuel -= fuel;
    this.currentPlanet = planet;
  }

  refuel(units: number) {
    const market = markets[this.currentPlanet];
    if (market.fuel.quantity < units) {
      throw new Error(
        `Error: not enough units in ${this.currentPlanet} market`,
      );
    }
    const fullFuelPrice = market.fuel.price * units;
    if (this.credits < fullFuelPrice) {
      throw new Error("Error: not enough credits");
    }
    // Convert fuel units to actual fuel
    const actualFuel = units * FUEL_CONVERTION_RATE;
    if (this.spaceship.fuel + actualFuel > MAX_FUEL) {
      const maxPossibleUnits = Math.floor(
        (MAX_FUEL - this.spaceship.fuel) / FUEL_CONVERTION_RATE,
      );
      throw new Error(
        `Error: max fuel is ${MAX_FUEL}. Max Possible units is ${maxPossibleUnits}`,
      );
    }

    this.spaceship.fuel += actualFuel;
    this.credits -= fullFuelPrice;
    market.fuel.quantity -= units;
    return { fuel: actualFuel, price: fullFuelPrice };
  }
}
