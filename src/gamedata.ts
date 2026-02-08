export type Planet =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export const planets: Planet[] = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];

// This narrows the parameter type to Planet if it returned true
export function isValidPlanet(planet?: string): planet is Planet {
  const planetSet = new Set(planets);
  return typeof planet === "string" && planetSet.has(planet as Planet);
}

export type Good = "water" | "metals" | "tech" | "spices" | "fuel";

export type MarketItem = {
  price: number;
  quantity: number;
};

export type PlanetMarket = {
  [key in Good]: MarketItem;
};

export type Markets = {
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

export type CargoItem = Exclude<Good, "fuel">;
const cargoItems = ["water", "metals", "tech", "spices"];

export function isValidCargoItem(cargoItem?: string): cargoItem is CargoItem {
  const cargoItemsSet = new Set(cargoItems);
  return typeof cargoItem === "string" && cargoItemsSet.has(cargoItem);
}

export type Cargo = {
  [key in CargoItem]: number;
};

export type SpaceShip = {
  fuel: number;
  cargo: Cargo;
  cargoCapacity: number;
  maxCargoCapacity: number;
};

export const planetDistances: Record<Planet, number> = {
  mercury: 1,
  venus: 2,
  earth: 3,
  mars: 4,
  jupiter: 8,
  saturn: 14,
  uranus: 19,
  neptune: 24,
};

export const MAX_FUEL = 25_000;
export const MIN_FUEL = 15_000;
export const MAX_WEALTH = 10_000;
export const MIN_WEALTH = 8_000;
export const MAX_CARGO_CAPACITY = 30;
export const MAX_CREDITS = 500;
export const MIN_CREDITS = 200;
