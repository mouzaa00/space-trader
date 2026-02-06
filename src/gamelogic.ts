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
  name: Good;
  price: number;
  quantity: number;
};
type Markets = {
  [key in Planet]: MarketItem[];
};

export const markets: Markets = {
  mercury: [
    { name: "water", price: 450, quantity: 5 },
    { name: "metals", price: 80, quantity: 50 },
    { name: "tech", price: 200, quantity: 15 },
    { name: "spices", price: 320, quantity: 8 },
    { name: "fuel", price: 120, quantity: 30 },
  ],
  venus: [
    { name: "water", price: 380, quantity: 12 },
    { name: "metals", price: 95, quantity: 40 },
    { name: "tech", price: 180, quantity: 20 },
    { name: "spices", price: 280, quantity: 15 },
    { name: "fuel", price: 100, quantity: 25 },
  ],
  earth: [
    { name: "water", price: 50, quantity: 100 },
    { name: "metals", price: 120, quantity: 60 },
    { name: "tech", price: 150, quantity: 45 },
    { name: "spices", price: 200, quantity: 30 },
    { name: "fuel", price: 80, quantity: 80 },
  ],
  mars: [
    { name: "water", price: 420, quantity: 8 },
    { name: "metals", price: 70, quantity: 70 },
    { name: "tech", price: 220, quantity: 12 },
    { name: "spices", price: 350, quantity: 6 },
    { name: "fuel", price: 110, quantity: 35 },
  ],
  jupiter: [
    { name: "water", price: 500, quantity: 3 },
    { name: "metals", price: 60, quantity: 90 },
    { name: "tech", price: 280, quantity: 8 },
    { name: "spices", price: 400, quantity: 4 },
    { name: "fuel", price: 150, quantity: 20 },
  ],
  saturn: [
    { name: "water", price: 480, quantity: 4 },
    { name: "metals", price: 65, quantity: 80 },
    { name: "tech", price: 250, quantity: 10 },
    { name: "spices", price: 380, quantity: 5 },
    { name: "fuel", price: 140, quantity: 22 },
  ],
  uranus: [
    { name: "water", price: 520, quantity: 2 },
    { name: "metals", price: 55, quantity: 100 },
    { name: "tech", price: 300, quantity: 6 },
    { name: "spices", price: 420, quantity: 3 },
    { name: "fuel", price: 160, quantity: 18 },
  ],
  neptune: [
    { name: "water", price: 550, quantity: 1 },
    { name: "metals", price: 50, quantity: 110 },
    { name: "tech", price: 320, quantity: 5 },
    { name: "spices", price: 450, quantity: 2 },
    { name: "fuel", price: 170, quantity: 15 },
  ],
};

type CargoItem = {
  name: Omit<Good, "fuel">;
  price: number;
  quantity: number;
};

type SpaceShip = {
  fuel: number;
  cargo: CargoItem[];
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
      cargo: [],
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

  buy(good: Omit<Good, "fuel">, quantity: number) {
    const market = markets[this.currentPlanet];

    let unitPrice: number | undefined = undefined;
    for (const unit of market) {
      if (unit.name == good) {
        if (unit.quantity < quantity) {
          throw new Error(
            `Not enough quantity in ${this.currentPlanet} market`,
          );
        }
        unitPrice = unit.price;
      }
    }

    if (!unitPrice) {
      throw new Error("Something went wrong!");
    }
    if (this.credits < unitPrice * quantity) {
      throw new Error("Not enough credits");
    }
    if (
      this.spaceship.cargoCapacity + quantity >
      this.spaceship.maxCargoCapacity
    ) {
      throw new Error("Not enough cargo capacity");
    }
    const item: CargoItem = {
      name: good,
      price: unitPrice,
      quantity: quantity,
    };
    this.spaceship.cargo.push(item);
    this.spaceship.cargoCapacity += quantity;
    this.credits -= unitPrice * quantity;
  }

  sell(good: Good, quantity: number) {
    const market = markets[this.currentPlanet];

    let unitPrice: number | undefined = undefined;
    for (const unit of market) {
      if (unit.name == good) {
        unitPrice = unit.price;
      }
      unitPrice = unit.price;
    }
    if (!unitPrice) {
      throw new Error("Something went wrong!");
    }

    for (const cargoUnit of this.spaceship.cargo) {
      if (cargoUnit.name === good) {
        if (cargoUnit.quantity < quantity) {
          throw new Error(`Not enough ${cargoUnit.name} quantity`);
        }
      }
    }
    this.spaceship.cargoCapacity -= quantity;
    this.credits += unitPrice * quantity;
  }
}
