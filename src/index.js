import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GameManager from './GameManager.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameManager />
  </React.StrictMode>
);
