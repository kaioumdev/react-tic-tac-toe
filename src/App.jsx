import React, { useState } from 'react';

// Square Component
const Square = ({ value, onSquareClick }) => {
  return (
    <button
      onClick={onSquareClick}
      className='bg-white border border-gray-300 h-16 w-16 m-1 text-2xl font-bold flex items-center justify-center transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-100 focus:outline-none shadow-lg rounded-md'
    >
      {value}
    </button>
  );
};

// Board Component
const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(newSquares);
  }

  return (
    <>
      <div className={`text-center text-3xl font-extrabold mb-4 ${winner ? 'text-yellow-500' : 'text-gray-800'}`}>
        {status}
      </div>
      <div className='grid grid-cols-3 gap-1'>
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
};

// Game Component
const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  const handlePlay = (newSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  //jumpTo Function
  const jumpTo = (move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move} className='mb-2'>
        <button
          onClick={() => jumpTo(move)}
          className='text-blue-500 hover:text-blue-700 transition ease-in-out duration-200'
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className='min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6'>
      <div className='bg-white bg-opacity-90 rounded-lg shadow-2xl p-8 flex flex-col items-center space-y-8'>
        <div className='text-center text-4xl font-extrabold text-gray-900 mb-6'>
          {calculateWinner(currentSquares) && `Winner: ${calculateWinner(currentSquares)}`}
        </div>
        <div className='flex space-x-8'>
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className='overflow-y-auto max-h-96'>
            <ol className='list-decimal pl-4 text-lg space-y-2'>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

// calculateWinner Function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
