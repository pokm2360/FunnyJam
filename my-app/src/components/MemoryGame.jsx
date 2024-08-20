import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// 카드가 플립될 때 애니메이션을 정의
const flipAnimation = keyframes`
  from {
    transform: rotateY(0);
  }
  to {
    transform: rotateY(180deg);
  }
`;

// 전체 게임을 감싸는 스타일
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #7345fd;
`;

// 카드 그리드의 스타일
const CardGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  width: 700px;
  height: 700px;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  list-style: none;
  margin: 0;
`;

// 카드의 스타일
const Card = styled.li`
  width: calc(100% / 4 - 20px);
  height: calc(100% / 4 - 20px);
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  cursor: pointer;

  .card-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s linear;
    backface-visibility: hidden;
  }

  &.flip .card-inner {
    animation: ${flipAnimation} 0.5s forwards;
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .card-front {
    background: #f0f0f0; /* 회색 배경 */
    transform: rotateY(180deg); /* 뒷면이 기본 상태가 되도록 */
  }

  .card-back {
    background: rgba(0, 0, 255, 0.2); /* 파란색 배경 */
    z-index: 2;
  }

  img {
    width: 80%;  /* 이미지 너비를 카드 크기의 80%로 설정 */
    height: 80%; /* 이미지 높이를 카드 크기의 80%로 설정 */
    object-fit: contain; /* 이미지가 찌그러지지 않고 카드 안에 들어가도록 설정 */
  }
`;

const MemoryGame = () => {
    const initialImages = [
        "bonobono01.png",
        "jjang901.png",
        "keroro01.png",
        "mococo01.png",
        "pikapika01.png",
        "sleep01.png",
        "tamama01.png",
        "water01.png",
    ];

    const [shuffledImages, setShuffledImages] = useState([]); // 이미지 배열을 상태로 저장
    const [flippedCards, setFlippedCards] = useState([...Array(16).keys()]); // 초기에는 모든 카드를 뒤집은 상태
    const [matchedCards, setMatchedCards] = useState([]);
    const [disableDeck, setDisableDeck] = useState(true); // 5초 동안 클릭을 막기 위해 true로 초기화

    useEffect(() => {
        // 이미지 배열을 초기화하고 섞어서 상태에 저장
        const shuffled = [...initialImages, ...initialImages].sort(() => Math.random() - 0.5);
        setShuffledImages(shuffled);

        const timer = setTimeout(() => {
            setFlippedCards([]); // 5초 후에 모든 카드를 뒷면으로 변경
            setDisableDeck(false); // 클릭을 허용
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleCardClick = (index) => {
        if (disableDeck || flippedCards.includes(index)) return;

        setFlippedCards((prev) => [...prev, index]);

        if (flippedCards.length === 1) {
            const firstIndex = flippedCards[0];
            const secondIndex = index;
            setDisableDeck(true);

            if (shuffledImages[firstIndex] === shuffledImages[secondIndex]) {
                setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
                setFlippedCards([]);
                setDisableDeck(false);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                    setDisableDeck(false);
                }, 1000);
            }
        }
    };

    return (
        <Wrapper>
            <CardGrid>
                {shuffledImages.map((image, index) => (
                    <Card
                        key={index}
                        className={flippedCards.includes(index) || matchedCards.includes(index) ? "flip" : ""}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="card-inner">
                            <div className="card-front">
                                <img src={`/img/main_img/MemoryGame/${image}`} alt={image} />
                            </div>
                            <div className="card-back" />
                        </div>
                    </Card>
                ))}
            </CardGrid>
        </Wrapper>
    );
};

export default MemoryGame;

// 타이머 기능 넣고 싶음
// 완료하면 축하한다고 팝업 넣고 싶음
// 시작하기 버튼 만들고 싶음
// 시작하기 버튼은 전체 화면에 백그라운드 오퍼서티 조절해서 시작하기만 누르게 하고 싶음.
// 아 뒤로가기 만들어야 하는데....
// 아....새로 게임하기 버튼도 만들어야 하는데.....