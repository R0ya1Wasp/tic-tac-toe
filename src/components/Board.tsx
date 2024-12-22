import React, { useState, useEffect } from 'react';
import Square from './Square';
import './Board.css';

interface BoardProps {
  size: number;
  onWin: (winner: string) => void;
}

const Board: React.FC<BoardProps> = ({ size, onWin }) => {
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (winner) {
      setSquares(Array(size * size).fill(null));
      setXIsNext(true);
      setWinner(null);
    }
  }, [winner, size]);


  const handleClick = (x: number, y: number) => {
    const index = y * size + x;
    if (squares[index] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const calculatedWinner = calculateWinner(newSquares, size);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      onWin(calculatedWinner);
    }
  };

  const renderSquare = (x: number, y: number) => {
    const key = `${x},${y}`;
    const index = y * size + x;
    return <Square key={key} value={squares[index]} onClick={() => handleClick(x, y)} />;
  };

  const renderBoard = () => {
    const rows = [];
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let x = 0; x < size; x++) {
        row.push(renderSquare(x, y));
      }
      rows.push(
        <div key={y} style={{ display: 'flex' }}>
          {row}
        </div>
      );
    }
    return rows;
  };

  return <div className="board-container">{renderBoard()}</div>;
};

const calculateWinner = (squares: (string | null)[], size: number): string | null => {
  const lines = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x <= size - 5; x++) {
      lines.push([y * size + x, y * size + x + 1, y * size + x + 2, y * size + x + 3, y * size + x + 4]);
    }
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y <= size - 5; y++) {
      lines.push([y * size + x, (y + 1) * size + x, (y + 2) * size + x, (y + 3) * size + x, (y + 4) * size + x]);
    }
  }

  for (let y = 0; y <= size - 5; y++) {
    for (let x = 0; x <= size - 5; x++) {
      lines.push([y * size + x, (y + 1) * size + x + 1, (y + 2) * size + x + 2, (y + 3) * size + x + 3, (y + 4) * size + x + 4]);
      lines.push([(y + 4) * size + x, (y + 3) * size + x + 1, (y + 2) * size + x + 2, (y + 1) * size + x + 3, y * size + x + 4]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
