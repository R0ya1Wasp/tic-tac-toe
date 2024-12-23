import React, { useState } from 'react';
import Board from './components/Board';
import Modal from './components/Modal';
import './App.css';

const App: React.FC = () => {
  const [size, setSize] = useState(20);
  const [winner, setWinner] = useState<string | null>(null); 
  const [currentPlayer, setCurrentPlayer] = useState('X'); 

  const handleWin = (winner: string) => {
    setWinner(winner);
  };

  const closeModal = () => {
    setWinner(null);
  };

  const switchPlayer = () => {
    setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
  };

  return (
    <div className="app-container">
      <h1>Бесконечные Крестики vs Нолики</h1>
      <div className="game-wrapper">
        <Board
          size={size}
          onWin={handleWin}
          currentPlayer={currentPlayer}
          onPlayerSwitch={switchPlayer}
        />
        <div className="current-player-window">
          <h2>Текущий ход:</h2>
          <div
            className={`player-indicator ${currentPlayer === 'X' ? 'x-player' : 'o-player'}`}
          >
            {currentPlayer}
          </div>
        </div>
      </div>
      <Modal
        show={winner !== null}
        message={`${winner} победили!`}
        onClose={closeModal}
      />
    </div>
  );
};

export default App;
