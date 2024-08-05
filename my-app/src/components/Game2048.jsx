import React, { useState, useEffect } from 'react';
import '../App.css';

const createBoard = () => {
  let board = Array(4).fill(null).map(() => Array(4).fill(0));
  addNumber(board);
  addNumber(board);
  return board;
};

const addNumber = (board) => {
  let added = false;
  while (!added) {
    let randRow = Math.floor(Math.random() * 4);
    let randCol = Math.floor(Math.random() * 4);
    if (board[randRow][randCol] === 0) {
      board[randRow][randCol] = Math.random() > 0.5 ? 2 : 4;
      added = true;
    }
  }
};

const move = (board, direction) => {
  let moved = false;
  const merge = (array) => {
    let newArray = array.filter(val => val);
    for (let i = 0; i < newArray.length - 1; i++) {
      if (newArray[i] === newArray[i + 1]) {
        newArray[i] *= 2;
        newArray[i + 1] = 0;
      }
    }
    return newArray.filter(val => val);
  };

  const moveArray = (array) => {
    let newArray = merge(array);
    while (newArray.length < 4) {
      newArray.push(0);
    }
    return newArray;
  };

  if (direction === "left" || direction === "right") {
    for (let row = 0; row < 4; row++) {
      let array = board[row].slice();
      if (direction === "right") array.reverse();
      let newArray = moveArray(array);
      if (direction === "right") newArray.reverse();
      if (newArray.toString() !== board[row].toString()) moved = true;
      board[row] = newArray;
    }
  } else if (direction === "up" || direction === "down") {
    for (let col = 0; col < 4; col++) {
      let array = board.map(row => row[col]);
      if (direction === "down") array.reverse();
      let newArray = moveArray(array);
      if (direction === "down") newArray.reverse();
      for (let row = 0; row < 4; row++) {
        if (board[row][col] !== newArray[row]) moved = true;
        board[row][col] = newArray[row];
      }
    }
  }
  if (moved) addNumber(board);
};

const Game2048 = () => {
  const [board, setBoard] = useState(createBoard());

  const handleKeyDown = (e) => {
    let newBoard = JSON.parse(JSON.stringify(board));
    if (e.key === "ArrowUp") move(newBoard, "up");
    else if (e.key === "ArrowDown") move(newBoard, "down");
    else if (e.key === "ArrowLeft") move(newBoard, "left");
    else if (e.key === "ArrowRight") move(newBoard, "right");
    setBoard(newBoard);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board]);

  return (
    <div>
      <div className="grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${cell ? "filled" : ""}`} data-value={cell}>
                {cell ? cell : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game2048;

