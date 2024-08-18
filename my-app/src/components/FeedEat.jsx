import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import characterImg from "../img/BubbleComponent/feed/keroro001.png";
import feedImg from "../img/BubbleComponent/feed/kerorofeed.png";
import characterImg01 from "../img/BubbleComponent/feed/mococo001.png";
import feedImg01 from "../img/BubbleComponent/feed/mococofeed.png";

const W = 600;
const H = 600;
const VELOCITY = {
  character: {
    left: 6,
    right: 6,
  },
  feedAccel: 0.02,
};
const CREATE_FEED_TIME = 500;
const FEED_SCORE = 50;
const MAX_MISSES = 10;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: #000000;
  font-weight: bold;
  background-color: ${props => props.$bgColor || '#333'};
  &:hover {
    opacity: 0.8;
  }
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

const CharacterChangeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background-color: #007bff;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const GameOverPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-size: 24px;
  color: #ff4a4a;
`;

const HeartContainer = styled.div`
  position: absolute;
  right: 25%;
  top: 7%;
  display: flex;
  flex-wrap: wrap;
  width: 160px;
  height: 60px;
  gap: 2px;
`;

const Heart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function FeedEat() {
  const [state, setState] = useState("stop");
  const [score, setScore] = useState(0);
  const [isAlternate, setIsAlternate] = useState(false);
  const [missedFeeds, setMissedFeeds] = useState(0);
  const ref = useRef(null);
  const characterRef = useRef(new Image());
  const feedRef = useRef(new Image());
  const feedSizeRef = useRef({ w: 0, h: 0 });
  const posRef = useRef({
    feeds: [],
    feedAccel: [],
    character: { x: 0, y: 0, w: 0, h: 0 },
  });
  const keyRef = useRef({
    isLeft: false,
    isRight: false,
  });

  const drawImage = useCallback(
    (ctx, img, { x, y, w, h }) => {
      ctx.drawImage(img, x, y, w, h);
    },
    []
  );

  const blockOverflowPos = useCallback((pos) => {
    pos.x = pos.x + pos.w >= W ? W - pos.w : pos.x < 0 ? 0 : pos.x;
    pos.y = pos.y + pos.h >= H ? H - pos.h : pos.y < 0 ? 0 : pos.y;
  }, []);

  const updateCharacterPos = useCallback(
    (characterPos) => {
      const key = keyRef.current;
      if (key.isLeft) characterPos.x -= VELOCITY.character.left;
      if (key.isRight) characterPos.x += VELOCITY.character.right;
      blockOverflowPos(characterPos);
    },
    [blockOverflowPos]
  );

  const createFeed = useCallback(() => {
    if (!feedRef.current) return;
    const size = feedSizeRef.current;
    posRef.current.feeds.push({
      x: Math.random() * (W - size.w),
      y: -size.h,
      ...size,
    });
    posRef.current.feedAccel.push(1);
  }, []);

  const updateFeedPos = useCallback((feedPos, index) => {
    const y = feedPos.y;
    const accel = posRef.current.feedAccel[index];
    posRef.current.feedAccel[index] = accel + accel * VELOCITY.feedAccel;
    feedPos.y = y + accel;
  }, []);

  const deleteFeed = useCallback((index) => {
    posRef.current.feeds.splice(index, 1);
    posRef.current.feedAccel.splice(index, 1);
  }, []);

  const catchFeed = useCallback(
    (feedPos, index) => {
      const characterPos = posRef.current.character;
      if (
        characterPos.x + characterPos.w >= feedPos.x &&
        characterPos.x <= feedPos.x + feedPos.w &&
        characterPos.y + characterPos.h >= feedPos.y &&
        characterPos.y <= feedPos.y + feedPos.h
      ) {
        deleteFeed(index);
        setScore(prevScore => prevScore + FEED_SCORE);
      }
    },
    [deleteFeed]
  );

  const handleMissedFeed = useCallback(() => {
    setMissedFeeds(prev => {
      const newMissed = prev + 1;
      if (newMissed >= MAX_MISSES) {
        setState("gameover");
      }
      return newMissed;
    });
  }, []);

  const initialGame = useCallback((ctx) => {
    ctx.clearRect(0, 0, W, H);
    const { w, h } = posRef.current.character;
    posRef.current.feedAccel = [];
    posRef.current.feeds = [];
    posRef.current.character = {
      x: W / 2 - w / 2,
      y: H - h,
      w,
      h,
    };
    keyRef.current.isLeft = false;
    keyRef.current.isRight = false;
    setScore(0);
    setMissedFeeds(0);
  }, []);

  useEffect(() => {
    const cvs = ref.current;
    const ctx = cvs?.getContext("2d");

    if (state === "stop" && ctx) {
      initialGame(ctx);
    }
    if (!cvs || !ctx || state !== "play") return;

    const characterImageSrc = isAlternate ? characterImg01 : characterImg;
    const feedImageSrc = isAlternate ? feedImg01 : feedImg;

    characterRef.current.src = characterImageSrc;
    characterRef.current.onload = () => {
      const w = characterRef.current.width;
      const h = characterRef.current.height;
      posRef.current.character = {
        x: W / 2 - w / 2,
        y: H - h,
        w,
        h,
      };
    };

    feedRef.current.src = feedImageSrc;
    feedRef.current.onload = () => {
      feedSizeRef.current.w = feedRef.current.width;
      feedSizeRef.current.h = feedRef.current.height;
    };

    let timer;
    let rafTimer;
    const pos = posRef.current;
    const animate = () => {
      const character = characterRef.current;
      const feed = feedRef.current;

      ctx.clearRect(0, 0, W, H);

      if (character) {
        updateCharacterPos(pos.character);
        drawImage(ctx, character, pos.character);
      }
      if (feed) {
        pos.feeds.forEach((feedPos, index) => {
          updateFeedPos(feedPos, index);
          drawImage(ctx, feed, feedPos);
        });
        pos.feeds.forEach((feedPos, index) => {
          if (feedPos.y >= H) {
            deleteFeed(index);
            handleMissedFeed();
          } else {
            catchFeed(feedPos, index);
          }
        });
      }
      rafTimer = requestAnimationFrame(animate);
    };
    rafTimer = requestAnimationFrame(animate);

    timer = window.setInterval(createFeed, CREATE_FEED_TIME);

    const onKeyDown = e => {
      const key = e.key.toLowerCase();
      keyRef.current.isLeft = key === "a" || key === "arrowleft";
      keyRef.current.isRight = key === "d" || key === "arrowright";
    };
    const onKeyUp = () => {
      keyRef.current.isLeft = false;
      keyRef.current.isRight = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      timer && window.clearInterval(timer);
      timer = undefined;
      rafTimer && cancelAnimationFrame(rafTimer);
      rafTimer = undefined;
    };
  }, [
    drawImage,
    updateCharacterPos,
    createFeed,
    updateFeedPos,
    deleteFeed,
    catchFeed,
    handleMissedFeed,
    state,
    initialGame,
    isAlternate,
  ]);

  const handleRestart = () => {
    setState("play");
    initialGame(ref.current?.getContext("2d"));
  };

  const renderHearts = () => {
    const hearts = [];
    const maxHearts = 10; // 두 줄로 표시하기 위해 5개씩 두 줄

    for (let i = 0; i < maxHearts; i++) {
      hearts.push(
        <Heart key={i}>
          {i < MAX_MISSES - missedFeeds ? (
            <IoIosHeart size={30} color="red" />
          ) : (
            <IoIosHeartEmpty size={30} color="gray" />
          )}
        </Heart>
      );
    }

    return hearts;
  };

  return (
    <>
      <ControlPanel>
        <Button $bgColor="#fff019" onClick={() => setState("pause")}>
          PAUSE
        </Button>
        <Button $bgColor="#3dff3d" onClick={() => setState("play")}>
          PLAY
        </Button>
        <Button $bgColor="#ff4a4a" onClick={() => setState("stop")}>
          STOP
        </Button>
      </ControlPanel>
      <canvas
        ref={ref}
        width={W}
        height={H}
        style={{
          display: "block",
          margin: "0 auto",
          border: "solid 1px black",
        }}
      />
      <CharacterChangeButton onClick={() => setIsAlternate(prev => !prev)}>
        CHANGE CHARACTER
      </CharacterChangeButton>
      <p style={{ textAlign: "center" }}>현재 점수: {score}</p>
      {state === "gameover" && (
        <GameOverPanel>
          <p>Game Over</p>
          <Button $bgColor="#007bff" onClick={handleRestart}>
            Restart
          </Button>
        </GameOverPanel>
      )}
      <HeartContainer>
        {renderHearts()}
      </HeartContainer>
    </>
  );
}

export default FeedEat;
