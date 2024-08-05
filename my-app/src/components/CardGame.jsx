import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 10px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  width: 100px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.flipped || props.matched ? '#ffeb3b' : '#4caf50')};
  color: white;
  font-size: 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const MatchCounter = styled.div`
  margin-top: 20px;
  font-size: 18px;
`;

const CardGame = () => {
  const initialCards = ["A", "B", "C", "D", "A", "B", "C", "D"];
  const shuffledCards = initialCards.sort(() => Math.random() - 0.5);
  const [cards, setCards] = useState(shuffledCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(cards[index])) {
      return;
    }
    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, cards[firstIndex]]);
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  return (
    <Container>
      <Grid>
        {cards.map((card, index) => (
          <Card
            key={index}
            flipped={flippedCards.includes(index)}
            matched={matchedCards.includes(card)}
            onClick={() => handleCardClick(index)}
          >
            {flippedCards.includes(index) || matchedCards.includes(card) ? card : "?"}
          </Card>
        ))}
      </Grid>
      <MatchCounter>Matches found: {matchedCards.length}</MatchCounter>
    </Container>
  );
};

export default CardGame;
