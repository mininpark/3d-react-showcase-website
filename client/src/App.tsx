import React from 'react';
import './index.scss';
import CanvasModel from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

function App() {
  return (
    <main className="app">
      <Home />
      <CanvasModel />
      <Customizer />
    </main>
  );
}

export default App;
