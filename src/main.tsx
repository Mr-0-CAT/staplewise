import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Buffer } from 'buffer';
import App from './App.tsx';
import './index.css';

// Make Buffer available globally for browser compatibility
window.Buffer = Buffer;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
