# Crypto Price Tracker

A real-time cryptocurrency price tracking application built with React and Redux Toolkit. This application simulates WebSocket updates to display live cryptocurrency data in a responsive table format.

## Features

- Real-time price updates (simulated)
- Responsive table layout
- Color-coded percentage changes
- 7-day price charts
- Redux state management
- Styled with styled-components

## Tech Stack

- React 18
- Redux Toolkit
- styled-components
- recharts (for charts)
- Create React App

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-price-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── components/
  │   └── CryptoTable.js
  ├── store/
  │   ├── index.js
  │   └── cryptoSlice.js
  ├── App.js
  ├── index.js
  └── index.css
```

## Architecture

- **Redux Store**: Manages the application state using Redux Toolkit
- **WebSocket Simulation**: Uses setInterval to simulate real-time updates
- **Components**: 
  - App: Main application component
  - CryptoTable: Displays the cryptocurrency data in a responsive table

## Future Improvements

- [ ] Integrate real WebSocket API (e.g., Binance)
- [ ] Add sorting and filtering capabilities
- [ ] Implement localStorage for data persistence
- [ ] Add unit tests
- [ ] Convert to TypeScript 