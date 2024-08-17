import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// 이미지 경로를 import
import bgImage from '../img/BubbleComponent/bubblepop_bg_image.jpg';

const Container = styled.div`
  background-image: url(${bgImage});  /* 이미지 파일을 배경으로 설정 */
  background-size: cover;  /* 배경 이미지가 화면 전체를 덮도록 설정 */
  background-position: center;  /* 배경 이미지의 위치를 가운데로 설정 */
  background-attachment: fixed;  /* 배경 이미지가 고정되도록 설정 */
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  font-size: 1em;
  color: #00498d;
  text-align: center;
  position: relative;
`;

const floatup = keyframes`
  0% {margin-top: 50%;}
  100% {margin-top: -50%;}
`;

const sideways = keyframes`
  0% {margin-left: 0em;}
  100% {margin-left: 20em;}
`;

const BubbleStyled = styled.div`
  position: absolute;
  width: 10em;
  height: 10em;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%,rgba(255,255,255,0) 70%);
  box-shadow: inset 0 20px 30px rgba(61, 146, 243, 0.4), inset 1em 1em 1em rgba(209, 161, 255, 0.6), 0 1em 2em rgba(0, 0, 0, 0.25);
  animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 5s ease-in-out infinite alternate;

  &:hover {
    display: none;
  }

  &.b1 { left: 10%; top: 100%; animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 5s ease-in-out infinite alternate; }
  &.b2 { left: 15%; top: 30%; transform: scale(0.7); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 4s ease-in-out 1s infinite alternate; }
  &.b3 { left: 20%; transform: scale(1.2); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 6s ease-in-out 6s infinite alternate; }
  &.b4 { left: 25%; top: 90%; transform: scale(0.5); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 5s ease-in-out 3s infinite alternate; }
  &.b5 { left: 30%; top: 30%; transform: scale(1.1); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 6s ease-in-out 3s infinite alternate; }
  &.b6 { left: 40%; top: 50%; transform: scale(0.7); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 4s ease-in-out 3.5s infinite alternate; }
  &.b7 { left: 90%; top: 90%; transform: scale(0.6); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 5s ease-in-out 4s infinite alternate; }
  
  /* New bubbles */
  &.b8 { left: 70%; top: 60%; transform: scale(1.3); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 3s ease-in-out 2s infinite alternate; }
  &.b9 { left: 80%; top: 20%; transform: scale(0.8); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 4s ease-in-out 2.5s infinite alternate; }
  &.b10 { left: 35%; top: 70%; transform: scale(1.5); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 5s ease-in-out 1.5s infinite alternate; }
  &.b11 { left: 60%; top: 40%; transform: scale(1.0); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 3.5s ease-in-out 3s infinite alternate; }
  &.b12 { left: 50%; top: 80%; transform: scale(0.9); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 4.5s ease-in-out 3s infinite alternate; }
  &.b13 { left: 65%; top: 10%; transform: scale(1.2); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 6s ease-in-out 4s infinite alternate; }
  &.b14 { left: 85%; top: 50%; transform: scale(0.6); animation: ${floatup} ${({ speed }) => speed}s linear infinite, ${sideways} 5s ease-in-out 5s infinite alternate; }
`;

const SpeedControlStyled = styled.div`
  margin-top: 20px;

  button {
    background-color: #a1aaf890;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    color: #000000;
    border-radius: 5px;

    &:hover {
      background-color: #d7e9fa;
    }
  }
`;

const BubbleComponent = () => {
  const [bubbleCount, setBubbleCount] = useState(0);
  const [speed, setSpeed] = useState(10);

  const handleBubblePop = () => {
    setBubbleCount(bubbleCount + 1);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const handleRefresh = () => {
    window.location.reload(); // 페이지를 새로 고침
  };

  return (
    <Container>
      <h1>Hover to pop!</h1>
      <h2>터트린 비눗방울: {bubbleCount}</h2>
      <SpeedControlStyled>
        <button onClick={() => handleSpeedChange(5)}>빠름</button>
        <button onClick={() => handleSpeedChange(10)}>보통</button>
        <button onClick={() => handleSpeedChange(15)}>느림</button>
        <button onClick={handleRefresh}>새로 고침</button> {/* 새로 고침 버튼 추가 */}
      </SpeedControlStyled>
      {[...Array(14)].map((_, i) => (
        <BubbleStyled key={i} className={`b${i + 1}`} speed={speed} onMouseOver={handleBubblePop} />
      ))}
    </Container>
  );
};

export default BubbleComponent;
