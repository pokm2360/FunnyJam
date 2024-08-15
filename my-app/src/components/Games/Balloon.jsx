import React, { useState } from 'react';

function Balloon() {
  const totalBalloons = 30;
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  
  const [balloons, setBalloons] = useState(
    Array.from({ length: totalBalloons }, () => ({
      isPresent: true,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  );

  const handleBalloonClick = (index) => {
    setBalloons(
      balloons.map((balloon, i) => 
        i === index ? { ...balloon, isPresent: false } : balloon
      )
    );
  };

  return (
    <div className="App">
      <h1>풍선 터트리기 게임</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 100px)', gap: '10px' }}>
        {balloons.map((balloon, index) => (
          <div
            key={index}
            onClick={() => handleBalloonClick(index)}
            style={{
              width: '90px',
              height: '120px',
              backgroundColor: balloon.color,
              borderRadius: '50%',
              cursor: 'pointer',
              display: balloon.isPresent ? 'block' : 'none',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Balloon;
