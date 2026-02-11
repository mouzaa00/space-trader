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
    water: { price: 300, quantity: 15 },
    metals: { price: 60, quantity: 80 },
    tech: { price: 180, quantity: 25 },
    spices: { price: 250, quantity: 15 },
    fuel: { price: 110, quantity: 40 },
  },
  venus: {
    water: { price: 250, quantity: 25 },
    metals: { price: 80, quantity: 60 },
    tech: { price: 160, quantity: 30 },
    spices: { price: 220, quantity: 20 },
    fuel: { price: 90, quantity: 35 },
  },
  earth: {
    water: { price: 40, quantity: 150 },
    metals: { price: 100, quantity: 80 },
    tech: { price: 130, quantity: 60 },
    spices: { price: 160, quantity: 40 },
    fuel: { price: 70, quantity: 100 },
  },
  mars: {
    water: { price: 280, quantity: 20 },
    metals: { price: 55, quantity: 90 },
    tech: { price: 190, quantity: 25 },
    spices: { price: 280, quantity: 15 },
    fuel: { price: 100, quantity: 45 },
  },
  jupiter: {
    water: { price: 350, quantity: 12 },
    metals: { price: 45, quantity: 120 },
    tech: { price: 230, quantity: 20 },
    spices: { price: 320, quantity: 12 },
    fuel: { price: 130, quantity: 30 },
  },
  saturn: {
    water: { price: 320, quantity: 15 },
    metals: { price: 50, quantity: 100 },
    tech: { price: 210, quantity: 22 },
    spices: { price: 290, quantity: 14 },
    fuel: { price: 120, quantity: 32 },
  },
  uranus: {
    water: { price: 380, quantity: 10 },
    metals: { price: 40, quantity: 130 },
    tech: { price: 250, quantity: 18 },
    spices: { price: 340, quantity: 10 },
    fuel: { price: 140, quantity: 28 },
  },
  neptune: {
    water: { price: 400, quantity: 8 },
    metals: { price: 35, quantity: 140 },
    tech: { price: 270, quantity: 16 },
    spices: { price: 360, quantity: 8 },
    fuel: { price: 150, quantity: 25 },
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

export const MAX_FUEL = 50_000;
export const MIN_FUEL = 35_000;
export const MAX_WEALTH = 5_000;
export const MIN_WEALTH = 3_500;
export const MAX_CARGO_CAPACITY = 50;
export const MAX_CREDITS = 1_500;
export const MIN_CREDITS = 800;
export const FUEL_CONVERTION_RATE = 500;
