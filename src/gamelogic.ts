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

type Good = "water" | "metals" | "tech" | "spices" | "fuel";
type MarketItem = {
  price: number;
  quantity: number;
};
type PlanetMarket = {
  [key in Good]: MarketItem;
};
type Markets = {
  [key in Planet]: PlanetMarket;
};

export const markets: Markets = {
  mercury: {
    water: { price: 450, quantity: 5 },
    metals: { price: 80, quantity: 50 },
    tech: { price: 200, quantity: 15 },
    spices: { price: 320, quantity: 8 },
    fuel: { price: 120, quantity: 30 },
  },
  venus: {
    water: { price: 380, quantity: 12 },
    metals: { price: 95, quantity: 40 },
    tech: { price: 180, quantity: 20 },
    spices: { price: 280, quantity: 15 },
    fuel: { price: 100, quantity: 25 },
  },
  earth: {
    water: { price: 50, quantity: 100 },
    metals: { price: 120, quantity: 60 },
    tech: { price: 150, quantity: 45 },
    spices: { price: 200, quantity: 30 },
    fuel: { price: 80, quantity: 80 },
  },
  mars: {
    water: { price: 420, quantity: 8 },
    metals: { price: 70, quantity: 70 },
    tech: { price: 220, quantity: 12 },
    spices: { price: 350, quantity: 6 },
    fuel: { price: 110, quantity: 35 },
  },
  jupiter: {
    water: { price: 500, quantity: 3 },
    metals: { price: 60, quantity: 90 },
    tech: { price: 280, quantity: 8 },
    spices: { price: 400, quantity: 4 },
    fuel: { price: 150, quantity: 20 },
  },
  saturn: {
    water: { price: 480, quantity: 4 },
    metals: { price: 65, quantity: 80 },
    tech: { price: 250, quantity: 10 },
    spices: { price: 380, quantity: 5 },
    fuel: { price: 140, quantity: 22 },
  },
  uranus: {
    water: { price: 520, quantity: 2 },
    metals: { price: 55, quantity: 100 },
    tech: { price: 300, quantity: 6 },
    spices: { price: 420, quantity: 3 },
    fuel: { price: 160, quantity: 18 },
  },
  neptune: {
    water: { price: 550, quantity: 1 },
    metals: { price: 50, quantity: 110 },
    tech: { price: 320, quantity: 5 },
    spices: { price: 450, quantity: 2 },
    fuel: { price: 170, quantity: 15 },
  },
};

type CargoItem = Exclude<Good, "fuel">;
type Cargo = {
  [key in CargoItem]: number;
};

type SpaceShip = {
  fuel: number;
  cargo: Cargo;
  cargoCapacity: number;
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
