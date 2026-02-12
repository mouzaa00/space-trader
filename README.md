# Space Trader CLI

A text-based space trading simulation game built with TypeScript and Node.js. Buy low, sell high, and navigate the solar system to reach your wealth target before running out of fuel or credits.

## Motivation

Space Trader was created as a fun way to learn TypeScript while building something interactive. Trading games have always been engaging - there's something satisfying about buying low, selling high, and watching your wealth grow. This project brings that experience to the terminal, letting you navigate a solar system, manage resources, and strategize your way to victory.

Whether you're learning TypeScript or just want a quick coffee break game, Space Trader offers a compact but complete gaming experience that runs right in your terminal.

## Quick Start

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

## Usage

- `status` - View your credits, cargo, fuel, and location
- `market` - Display current planet's market prices
- `buy <item> <quantity>` - Purchase goods
- `sell <item> <quantity>` - Sell cargo
- `travel <planet>` - Move to another planet (costs fuel)
- `refuel <units>` - Buy fuel
- `explore` - View travel destinations and fuel costs
- `help` - Show all commands
- `quit` - Exit game

## Contributing

```bash
# Clone the repository
git clone <repository-url>
cd space-trader

# Install dependencies
pnpm install

# Start the game
pnpm start
```

Contributions are welcome! Here's how you can help:

1. **Fork the repository** and create a feature branch
2. **Make your changes** - whether it's fixing bugs, adding features, or improving documentation
3. **Test your changes** to ensure everything works correctly
4. **Submit a pull request** with a clear description of what you changed and why

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd space-trader

# Install dependencies
pnpm install

# Start the game
pnpm start
```

### Code Style

- Follow the existing TypeScript patterns and conventions
- Keep functions small and focused
- Add comments for complex logic

## Learning Outcomes

This project demonstrates:
- **TypeScript best practices** with strict compiler settings
- **Object-oriented design** principles
- **Error handling** and input validation
- **Game loop architecture** for interactive applications
- **State management** in a complex system


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
