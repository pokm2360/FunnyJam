import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 파스텔 톤 색상 생성 함수
const getRandomPastelColor = () => {
  const base = Math.floor(Math.random() * 256);
  const pastelColor = `rgb(${base + 170}, ${base + 200}, ${base + 230})`;
  return pastelColor;
};

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: black;
  overflow: hidden;
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
  position: relative;
  perspective: 1000px; /* 3D 효과를 위한 원근감 설정 */
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; /* 3D 변형 보존 */
  transform: rotateY(${props => props.hovered ? '180deg' : '0deg'}); /* 카드 회전 효과 */
  transition: transform 0.6s; /* 부드러운 변환 */
`;

const CardInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  transform-style: preserve-3d; /* 3D 변형 보존 */
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  border-radius: 5px;
  backface-visibility: hidden; /* 뒷면 숨기기 */
`;

const CardFront = styled(CardSide)`
  background-color: #000000;
  color: white;
`;

const CardBack = styled(CardSide)`
  background-color: #ccc;
  color: black;
  transform: rotateY(180deg); /* 뒷면 회전 */
`;

// Box 컴포넌트 추가
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || 'white'};
  color: black;
  font-size: 2em; 
  font-weight: bold; 
  width: 100px;
  height: 100px; /* 카드의 높이 설정 */
`;

const StaticTextWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  z-index: 10; /* 카드 애니메이션 위에 오도록 z-index 설정 */
`;

const StaticText = styled(Link)`
  background-color: ${props => props.bgColor || 'white'};
  color: white;
  font-size: 1em;
  padding: 20px;
  margin: 2px;
  text-decoration: none;
  border: 0.15rem solid #000;
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: ${props => (props.reverse ? 'flex-end' : 'flex-start')};
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: ${props => props.bgColor || 'white'};
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${props => `url(${props.bgImage}) no-repeat center/cover`};
  clip-path: ${props => (props.reverse 
    ? 'polygon(0% 0, 75% 0, 65% 100%, 0% 100%)'
    : 'polygon(40% 0, 100% 0, 100% 100%, 25% 100%)' 
  )};
`;

const Content = styled.div`
  width: 50%;
  text-align: ${props => (props.reverse ? 'right' : 'left')};
  padding: 20px;
  position: relative;
  z-index: 1;
  color: ${props => props.color || '#000'};
`;

const Title = styled.h2`
  margin: 0;
`;

const Text = styled.p`
  margin: 5px 0;
`;

const FooterText = styled.p`
  margin: 20px 0 0 0;
  font-size: 12px;
  color: #666;
`;

const Footer = styled.div`
  background: lightgrey;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HoverButton = styled.a`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  z-index: 2;
`;

const Section = ({ bgColor, bgImage, reverse, color, children, link }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <SectionWrapper
      bgColor={bgColor}
      reverse={reverse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Background bgImage={bgImage} reverse={reverse} />
      <HoverButton href={link} show={hovered}>보러가기</HoverButton>
      <Content color={color} reverse={reverse}>
        {children}
      </Content>
    </SectionWrapper>
  );
};

const Main = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Container>
      <Banner
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card hovered={hovered}>
          <CardInner>
            <CardFront>
              {[
                'Y', 'O', 'U', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
                'W', 'A', 'N', 'T', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
                'S', 'O', 'M', 'E', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
                'F', 'U', 'N', 'N', 'Y', '?', '', '', '', '', '', '', '', '', '', '', '', ''
              ].map((text, index) => (
                <Box key={index} bgColor={getRandomPastelColor()}>
                  {text}
                </Box>
              ))}
            </CardFront>
            <CardBack>
              {[
                '', '', '', '', '', '', '', '', '', '', '', '', '', 'Y', 'O', 'U', '', '', 
                '', '', '', '', '', '', '', '', '', '', '', '', 'W', 'A', 'N', 'T', '', '', 
                '', '', '', '', '', 'S', 'O', 'M', 'E', '😀', 'F', 'U', 'N', 'N', 'Y', '!!', '', '', 
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''  
              ].map((text, index) => (
                <Box key={index} bgColor={getRandomPastelColor()}>
                  {text}
                </Box>
              ))}
            </CardBack>
          </CardInner>
        </Card>
        <StaticTextWrapper>
          <StaticText to="https://github.com/pokm2360" bgColor="#32CD32">KIM KYUNG HWAN</StaticText>
          <StaticText to="https://github.com/JEONwhail" bgColor="#00FF00">KIM JI YEON</StaticText>
        </StaticTextWrapper>
      </Banner>

      <Section
        reverse
        bgColor="#E1F5FE"
        bgImage="/img/main_img/main_goodwords.JPG"
        color="#03A9F4"
        link="/encouragement"
      >
        <Title>응원이 필요하신가요?</Title>
        <Text>저희가 따뜻한 말을 건네드릴게요!</Text>
        <Text>힘들 땐 잠시 쉬어가세요.</Text>
        <Text>포기하지 마세요, 좋은 일이 있을 거예요!</Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 1일<br />사용된 기능: <br />React | react-router-dom | styled-components</FooterText>
      </Section>

      <Section
        bgColor="#FFEBEE"
        bgImage="/img/main_img/MemoryGame.png"
        color="#FF6347"
        link="/MemoryGame"
      >
        <Title>이미지 카드 짝 맞추기</Title>
        <Text>이미지를 외워서 카드를 맞춰보세요!</Text>
        <Text>이미지는 수정될 예정입니다(아마도)</Text>
        <Text>5초동안 이미지의 위치를 외우고! 기억력을 테스트 하세요!</Text>
        <Text>제한시간은 없으며,여러분이 재밌게 이용한다면 잇츠 오케이 입니다! </Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 2일<br />사용된 기능: <br />React | react-router-dom | styled-components</FooterText>
      </Section>

      <Section
        reverse
        bgColor="#E3F2FD"
        bgImage="/img/main_img/FeedEat.png"
        color="#4682B4"
        link="/FeedEat"
      >
        <Title>밥먹는 최애캐릭터</Title>
        <Text>개발자 2명이 좋아하는 캐릭터가 들어갔습니다.</Text>
        <Text>케로로와 모코코의 먹이를 맥여주세요</Text>
        <Text>디자인이 별로인건 저희도 알고 있습니다!!!!</Text>
        <Text>저희의 노력만 예쁘게 봐주셨으면 해요 😢</Text>
        <Text>참고 :  </Text>
        <Text> https://fe-developers.kakaoent.com/2022/220830-simple-canvas-game/ </Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 5일<br />사용된 기능: React | JS | CSS</FooterText>
      </Section>

      <Section
        bgColor="#E8F5E9"
        bgImage="/img/main_img/BubbleComponent/bubble_hover.png"
        color="#32CD32"
        link="/BubbleComponent"
      >
        <Title>비눗방울 터트리기</Title>
        <Text>Hover 기능으로 풍선을 많이 터트려보세요!</Text>
        <Text>퍼블리셔를 맡은 사람이 스폰지밥을 좋아합니다!! </Text>
        <Text>랭킹은 없습니다.</Text>
        <Text>하지만 무한으로 터트려지는 비눗방울!</Text>
        <Text>스트레스 받을 때 미친듯한 마우스로 한번 풀어보세용..ㅎ.ㅎ..</Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 1일<br />사용된 기능: React | JS | CANVASS</FooterText>
      </Section>

      <Section
        reverse
        bgColor="#FFF9C4"
        bgImage="/img/main_img/several.png"
        color="#FFD700"
        link="/yok"
      >
        <Title>영어로 욕해드립니다.</Title>
        <Text>랜덤으로 영어 욕이 나옵니다.....</Text>
        <Text>어떤 영어 욕이 있는지 궁금할때?</Text>
        <Text>이 사이트에서 랜덤으로 한번 욕을 살펴보세요!</Text>
        <Text>머....다른 나쁜 곳에서는 사용하지 마세요ㅜ</Text>
        <Text>저희는 이용자들이 키보드 워리어가 되는걸 바라지 않아요...!</Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 5일<br />사용된 기능: React | JS | CSS</FooterText>
      </Section>

      <Section
        bgColor="#e2b8ec"
        bgImage="/img/main_img/minebg.png"
        color="#ae32cd"
        link="/minesearch"
      >
        <Title>지뢰 찾기</Title>
        <Text>너무나 유명한 게임 중 하나!</Text>
        <Text>심심할 때 하기 딱 좋은 게임! </Text>
        <Text style={{ textDecoration: 'line-through'}}>만드는 데 좀 고생한 게임!</Text>
        <Text>재미있게 즐겨보세요~</Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 5일<br />사용된 기능: React | JS | CANVASS</FooterText>
      </Section>

      <Footer>
        <Text>만든사람 : 김경환, 김지연</Text>
        <Text>사용 기술: React | JS | 머...다 있겠지...</Text>
        <Text>콜미플리즈</Text>
      </Footer>
    </Container>
  );
};

export default Main;
