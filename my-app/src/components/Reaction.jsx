import React, { useState, useEffect } from 'react';

function Reaction() {
  const [sequence, setSequence] = useState([]); // 컴퓨터가 생성한 순서
  const [userSequence, setUserSequence] = useState([]); // 사용자가 입력한 순서
  const [level, setLevel] = useState(0); // 현재 레벨
  const [message, setMessage] = useState('Click Start to Play'); // 안내 메시지
  const [isUserTurn, setIsUserTurn] = useState(false); // 사용자가 버튼을 누를 차례인지 여부

  const colors = ['red', 'blue', 'green', 'yellow'];

  useEffect(() => {
    if (level > 0) {
      setMessage('Watch the sequence...');
      generateSequence();
    }
  }, [level]);

  const generateSequence = () => {
    const newSequence = [...sequence, colors[Math.floor(Math.random() * colors.length)]];
    setSequence(newSequence);
    playSequence(newSequence);
  };

  const playSequence = (sequence) => {
    let index = 0;

    const interval = setInterval(() => {
      flashButton(sequence[index]);
      index++;

      if (index >= sequence.length) {
        clearInterval(interval);
        setIsUserTurn(true);
        setMessage('Your turn!');
      }
    }, 1000);
  };

  const flashButton = (color) => {
    const button = document.getElementById(color);
    button.style.opacity = '0.5';
    setTimeout(() => {
      button.style.opacity = '1';
    }, 500);
  };

  const handleButtonClick = (color) => {
    if (isUserTurn) {
      const newUserSequence = [...userSequence, color];
      setUserSequence(newUserSequence);

      if (sequence[newUserSequence.length - 1] !== color) {
        setMessage('Game Over! You reached level ' + level);
        resetGame();
      } else if (newUserSequence.length === sequence.length) {
        setIsUserTurn(false);
        setUserSequence([]);
        setMessage('Great! Get ready for the next level...');
        setTimeout(() => setLevel(level + 1), 1000);
      }
    }
  };

  const resetGame = () => {
    setSequence([]);
    setUserSequence([]);
    setLevel(0);
    setIsUserTurn(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Memory Game</h1>
      <h2 style={styles.message}>{message}</h2>
      <div style={styles.grid}>
        {colors.map((color) => (
          <div
            key={color}
            id={color}
            style={{ ...styles.button, backgroundColor: color }}
            onClick={() => handleButtonClick(color)}
          />
        ))}
      </div>
      <button style={styles.startButton} onClick={() => setLevel(1)}>
        Start Game
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 150px)',
    gridTemplateRows: 'repeat(2, 150px)',
    gap: '20px',
    marginBottom: '20px',
  },
  button: {
    width: '150px',
    height: '150px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  startButton: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
  },
};

export default Reaction;


