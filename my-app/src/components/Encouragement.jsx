import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  

const EncouragementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
  font-family: 'Arial', sans-serif;
  position: relative;  
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  font-size: 2rem;
  color: #333;
  margin: 0 2rem;
  text-align: center;
`;

const BackButton = styled(Link)`  
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
  background-color: #d9e9f7;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const messages = [
  "당신은 할 수 있어요!",
  "힘들 땐 잠시 쉬어가도 괜찮아요.",
  "포기하지 마세요, 끝은 가까워요!",
  "오늘도 멋진 하루가 될 거예요!",
  "작은 변화가 큰 기적을 만듭니다.",
  "당신의 노력은 헛되지 않아요!",
  "뭐든뭐든 당신은 성공 할거에요!!",
  "당신은 소중해요.",
];

const Encouragement = () => {
  const [message, setMessage] = useState('');

  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  return (
    <EncouragementContainer>
      <BackButton to="/">홈으로 이동</BackButton> 
      {message ? (
        <Message>{message}</Message>
      ) : (
        <>
          <Title>
            응원이 필요한 당신! <br/>
            응원해드릴게요! !!!
          </Title>
          <Button onClick={handleButtonClick}>응원받기!</Button>
        </>
      )}
    </EncouragementContainer>
  );
};

export default Encouragement;
