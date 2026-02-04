type Planet =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

const planets: Planet[] = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];

type Item = {
  name: string;
};

type SpaceShip = {
  fuel: number;
  cargo: Item[];
  maxCargoCapacity: number;
};

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

const MAX_FUEL = 50_000;
const MIN_FUEL = 10_000;
const MAX_WEALTH = 15_000;
const MIN_WEALTH = 7_000;
const MAX_CARGO_CAPACITY = 50;
const MAX_CREDITS = 300;
const MIN_CREDITS = 100;

export class GameState {
  private currentPlanet: Planet;
  private spaceship: SpaceShip;
  private targetWealth: number;
  private credits: number;

  constructor() {
    this.currentPlanet = selectRandomPlanet(planets);
    this.spaceship = {
      fuel: generateNumber(MAX_FUEL, MIN_FUEL),
      cargo: [],
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

  getIntendedWealth() {
    return this.targetWealth;
  }

  getCredits() {
    return this.credits;
  }
}
