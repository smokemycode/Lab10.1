# Advanced React Counter

A simple counter app built with React + TypeScript that practices `useState` and `useEffect`.

## Features

- **Count display** – starts at 0
- **Increment / Decrement** buttons
- **History** – shows every count value as it changes
- **Auto-save** – saves the count to `localStorage` after 500ms (with cleanup so rapid clicks don't spam saves)
- **Keyboard shortcuts** – `ArrowUp` to increment, `ArrowDown` to decrement
- **Reset** – sets count back to 0 and clears history
- **Custom step** – type a number to change how much +/− adds or subtracts

## Getting Started

```bash
npm install
npm run dev
Open the URL shown in the terminal (usually http://localhost:5173).
```

## Project Structure
```
src/
├── App.tsx                      # Renders the counter
└── components/
    └── AdvancedCounter.tsx      # All counter logic lives here
```

## How it Works
- `useState` holds the count, history, and step.
- `useEffect` #1 records the new count into history whenever `count` changes.
- `useEffect` #2 saves the count to `localStorage` — its cleanup cancels the previous timer so only the latest value is saved.
- `useEffect` #3 adds keyboard listeners on mount and removes them on unmount (or when step changes).

## Tech
- React 18
- TypeScript
- Vite