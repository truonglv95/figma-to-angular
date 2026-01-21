# Figma to Angular MCP Server

This is a Model Context Protocol (MCP) server designed to convert Figma designs directly into Angular components. It connects to the Figma API, retrieves node usage data, and generates the corresponding TypeScript, HTML, and CSS code following Angular best practices.

## Features

- **Figma to Angular Conversion**: Converts selected Figma nodes into standalone Angular components.
- **Smart Style Extraction**: Extracts colors, typography, and layout properties.
- **Clean Code Generation**: Produces readable and maintainable code (TS, HTML, CSS).
- **MCP Integration**: Designed to work seamlessly with MCP clients (like Claude Desktop or other AI agents).

## Prerequisites

- Node.js (v18 or higher)
- A Figma Account and Personal Access Token

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd figma-to-angular
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your Figma Personal Access Token:
   ```env
   FIGMA_ACCESS_TOKEN=your_figma_token_here
   ```

## Usage

### Building the Server

```bash
npm run build
```

### Running the Server

```bash
npm start
```

### Development

To run in development mode (if using `ts-node` or similar, otherwise use build & start):

```bash
npm run build && npm start
```

## Tooling

This project is configured with robust tooling:

- **Biome**: For fast formatting and linting (`npm run check`).
- **Husky & Lint-staged**: Ensures code quality on pre-commit.
- **Commitlint**: Enforces conventional commit messages.

## License

ISC
