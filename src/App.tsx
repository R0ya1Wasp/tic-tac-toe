import React, { useState } from 'react';
import Board from './components/Board';
import Modal from './components/Modal';
import './App.css';

const App: React.FC = () => {
  const [size, setSize] = useState(20);
  const [winner, setWinner] = useState<string | null>(null);

  const handleWin = (winner: string) => {
    setWinner(winner);
  };

  const closeModal = () => {
    setWinner(null);
  };

  return (
    <div className="app-container">
      <h1>Крестики vs Нолики</h1>
      <Board size={size} onWin={handleWin} />
      <Modal show={winner !== null} message={`${winner} победили!`} onClose={closeModal} />
    </div>
  );
};

export default App;
