# Space Trader CLI

A text-based space trading simulation game built with TypeScript and Node.js. Buy low, sell high, and navigate the solar system to reach your wealth target before running out of fuel or credits.

## Features

- **8 Unique Planets**: Each with distinct market prices and economic profiles
- **Dynamic Economy**: Real-time supply/demand with market quantities that deplete and replenish
- **Strategic Trading**: 4 trade goods (water, metals, tech, spices) with varying profit margins
- **Resource Management**: Balance fuel consumption, cargo capacity, and credits
- **Win/Lose Conditions**: Reach target wealth or get stranded with no fuel and no money

## Tech Stack

- **TypeScript** - Strict type safety with union types, type guards, and mapped types
- **Node.js** - CLI interface using native readline module
- **ES Modules** - Modern JavaScript module system

## Key Technical Highlights

### Type Safety
- Union types for planets and goods prevent invalid inputs at compile time
- Custom type guards (`isValidPlanet`, `isValidCargoItem`) for runtime validation
- Mapped types for type-safe market data structures

### Game Architecture
- **Command Pattern**: Each game command is encapsulated in its own module
- **State Management**: Centralized `GameState` class manages all game logic
- **Separation of Concerns**: Data (`gamedata.ts`), logic (`gamelogic.ts`), and commands are cleanly separated

### Input Validation
- Comprehensive validation for all user inputs
- Positive quantity validation to prevent invalid trades
- Graceful error handling with descriptive messages

## Running the Game

```bash
# Install dependencies
pnpm install

# Start the game
pnpm start
```

## Game Commands

- `status` - View your credits, cargo, fuel, and location
- `market` - Display current planet's market prices
- `buy <item> <quantity>` - Purchase goods
- `sell <item> <quantity>` - Sell cargo
- `travel <planet>` - Move to another planet (costs fuel)
- `refuel <units>` - Buy fuel
- `explore` - View travel destinations and fuel costs
- `help` - Show all commands
- `quit` - Exit game

## Learning Outcomes

This project demonstrates:
- **TypeScript best practices** with strict compiler settings
- **Object-oriented design** principles
- **Error handling** and input validation
- **Game loop architecture** for interactive applications
- **State management** in a complex system

## Example Gameplay

```
Space Trader > status

=== SPACE TRADER STATUS ===

Location: earth
Credits: $1,200.00

--- Spaceship ---
Fuel: 42,000 / 50,000
Cargo: 0 / 50

Current Cargo:
Empty cargo!

--- Mission ---
Target Wealth: $4,500.00
Progress: 26.67% ($3,300.00 remaining)

Space Trader > market
=== EARTH MARKET ===

Available Goods:
  water    -  $40.00  (150 available)
  metals   -  $100.00  (80 available)
  tech     -  $130.00  (60 available)
  spices   -  $160.00  (40 available)
  fuel     -  $70.00  (100 available)

Your Credits: $1,200.00
==================

Space Trader > buy water 20
You bought 20 water from earth market

Space Trader > travel mars
Traveled from earth to mars
- 500 consumed, 41,500 remaining...

Space Trader > sell water 20
You sold 20 water to mars market
```

## Project Structure

```
src/
├── main.ts           # Game loop and command routing
├── gamelogic.ts      # GameState class and core logic
├── gamedata.ts       # Types, constants, and market data
├── buy.ts            # Buy command
├── sell.ts           # Sell command
├── travel.ts         # Travel command
├── market.ts         # Market display command
├── status.ts         # Status display command
├── refuel.ts         # Refuel command
├── explore.ts        # Explore destinations command
├── help.ts           # Help command
└── quit.ts           # Quit command
```

*Built as a learning project to explore TypeScript's type system and CLI application architecture.*
