import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./assets/css/app.css";

function Box({ value, onClick }) {

  return (
    <button className="box" onClick={onClick}>
      {value}
    </button>
  );
}

function Restart({ onClick }) {

  return (
    <button className="restart" onClick={onClick}>
      New Game
    </button>
  );
}

function Game() {
  const [ boxes, setBoxes ] = useState(Array(9).fill(null));
  const [ isXNext, setIsXNext ] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = findWinner(boxes);

  function getStatus() {
    if (winner) {
      return "Winner: " + winner;
    } else if (noMoreBoxes(boxes)) {
      return "Draw!";
    } else {
      return "Next player: " + nextSymbol;
    }
  }

  function renderBox(i) {
    return (
      <Box
        value={boxes[i]}
        onClick={() => {
          if (boxes[i] != null || winner != null) {
            return;
          }
          const nextBoxes = boxes.slice();
          nextBoxes[i] = nextSymbol;
          setBoxes(nextBoxes);

          setIsXNext(!isXNext);
        }}
      />
    );
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setBoxes(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="game">
        <h1 className="title">TIC TAC TOE</h1>
        <div className="game-board">
          <div className="board-row">
            {renderBox(0)}
            {renderBox(1)}
            {renderBox(2)}
          </div>
          <div className="board-row">
            {renderBox(3)}
            {renderBox(4)}
            {renderBox(5)}
          </div>
          <div className="board-row">
            {renderBox(6)}
            {renderBox(7)}
            {renderBox(8)}
          </div>
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));

function findWinner(boxes) {
  const possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (let i = 0; i < possibleWins.length; i++) {
    const [a, b, c] = possibleWins[i];
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  }
  return null;
}

function noMoreBoxes(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i] == null) {
      return false;
    }
  }
  return true;
}