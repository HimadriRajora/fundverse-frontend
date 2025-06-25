// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';           // your tailwind build (if using Tailwind)
import { App } from './App';    // your App component

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(<App />);
