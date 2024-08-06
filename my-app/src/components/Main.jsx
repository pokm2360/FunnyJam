import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Banner = styled.div`
  background: grey;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
    ? 'polygon(0 0, 66.67% 0, 33.33% 100%, 0 100%)'
    : 'polygon(33.33% 0, 100% 0, 100% 100%, 66.67% 100%)'
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

const LangToggle = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
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
      <HoverButton href={link} show={hovered}>확인하기</HoverButton>
      <Content color={color} reverse={reverse}>
        {children}
      </Content>
    </SectionWrapper>
  );
};

const Main = () => {
  return (
    <Container>
      <Banner>
        <div>
          <Title>도파민 잔뜩</Title>
          <Text>I WANT FUNNY</Text>
          <Text>클릭하면 밑의 영역으로 화면전환</Text>
          <Text>컨퍼로 키워드 찾기 가능????</Text>
        </div>
        <LangToggle>
          <span>KOR</span> | <span>ENG</span>
        </LangToggle>
      </Banner>
      <Section
        bgColor="#FFEBEE"
        bgImage="https://placehold.co/800x600"
        color="#FF6347"
        link="#clover"
      >
        <Title>네잎클로버 찾기</Title>
        <Text>hover 기능으로 찾아내는 컴포넌트 입니다.</Text>
        <Text>마우스를 이용해서 네잎클로버를 찾아보세요!</Text>
        <Text>확대되는 클로버들 중에서 행운의 네잎클로버를 찾아야 합니다.</Text>
        <Text>제한시간이 있으며, 4레벨로 이루어진 머..사이트? 그런거 입니다.</Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 5일<br />사용된 기능: React | JS | CANVASS</FooterText>
      </Section>
      <Section
        reverse
        bgColor="#E3F2FD"
        bgImage="https://placehold.co/800x600"
        color="#4682B4"
        link="#cloud"
      >
        <Title>물멍?불멍? 저리 가라 구름멍</Title>
        <Text>CSS가 주된 기능으로 애니메이션 컴포넌트 입니다.</Text>
        <Text>가만히 앉아서 구름을 볼 수 있는 사이트입니다!</Text>
        <Text>7가지 색상의 구름을 선택 할 수 있습니다.</Text>
        <Text>다소 구름 모양이 맘에 안들 수도 있지만, 디자이너의 실력을 가지지 못한</Text>
        <Text>저희의 노력만 예쁘게 봐주셨으면 해요 😢</Text>
        <Text>아님...만들어주세요...</Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 5일<br />사용된 기능: React | JS | CSS</FooterText>
      </Section>
      <Section
        bgColor="#E8F5E9"
        bgImage="https://placehold.co/800x600"
        color="#32CD32"
        link="#balloon"
      >
        <Title>풍선 터트리기</Title>
        <Text>click 기능으로 풍선을 많이 터트려보세요!</Text>
        <Text>프론트앤드와 퍼블리셔의 작업물로.... </Text>
        <Text>랭킹은 없습니다.</Text>
        <Text>하지만 무한으로 터트려지는 풍선!</Text>
        <Text>스트레스 받을 때 미친듯한 클릭으로 한번 풀어보세용..ㅎ.ㅎ..</Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 5일<br />사용된 기능: React | JS | CANVASS</FooterText>
      </Section>
      <Section
        reverse
        bgColor="#FFF9C4"
        bgImage="https://placehold.co/800x600"
        color="#FFD700"
        link="#curse"
      >
        <Title>대신 욕해드립니다.</Title>
        <Text>랜덤으로 욕이 들어간 문장이 나옵니다.....</Text>
        <Text>적절한 욕을 찾지 못할 때?</Text>
        <Text>이 사이트에서 랜덤으로 한번 욕을 들어보세요!</Text>
        <Text>머....다른 나쁜 곳에서는 사용하지 마세요ㅜ</Text>
        <Text>저희는 이용자들이 키보드 워리어가 되는걸 바라지 않아요...!</Text>
        <FooterText>제작자: 김경환, 김지연<br />제작 소요 기간: 5일<br />사용된 기능: React | JS | CSS</FooterText>
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