import React, { useEffect, useState } from "react";
import Square from "./Square";
import "../index.css";

const calculateWinner = (squares) => {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const [winner, setWinner] = useState(calculateWinner(squares));
  const [status, setStatus] = useState("");

  useEffect(() => {
    setWinner(calculateWinner(squares));
    if (winner) {
      setStatus("Winner: " + winner);
      setTimeout(() => {
        setSquares(Array(9).fill(null));
        setWinner("");
      }, 1000);
    } else if (isBoardFull(squares)) {
      setStatus("Draw!");
    } else {
      setStatus("Next player: " + nextSymbol);
    }
  }, [winner, nextSymbol]);

  const ResetButton = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          // console.log(squares[i],'first');

          if (!squares[i]) { // checking Array varaiable is empty Or not
           
            const nextSquares = squares.slice();
            nextSquares[i] = nextSymbol;
            setSquares(nextSquares);
            setIsXNext(!isXNext); // toggle turns
          } else if (winner && !squares[i]) {
            alert("winner already exist");
          } else if (squares[i]) {
            // console.log('squares[i] second',squares[i]);
            alert("Placed is already marked");
          }
        }}
      />
    );
  };

  const isBoardFull = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        {status && <div className="game-info">{status}</div>}
        <button className="restart-button" onClick={ResetButton}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Board;
