import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const quotes = [
  "ABOMINATION: 있어서는 안 될 존재, 혐오스러운 새끼, 기분 나쁜 자식을 뜻한다.",
  "A hell of a ~ : 골때리는 ~이다.",
  "Asshat: 매우 우둔한 사람.",
  "Bat: 이솝 우화에서 유래했으며 이랬다 저랬다 하는 놈을 뜻한다.",
  "Beat it: '꺼져'. 'Fuck off'보다 순화된 표현이다.",
  "Beat me: 맞짱 뜨자. 한국어로는 \"쳐 봐\" 에 가깝다. 물론 영미권은 한국처럼 상해죄 폭행죄 깽값 생각 해보기 전에 주먹부터 나가는 문화이니 진짜로 주먹이 날아올 걸 예상하고 하자.",
  "Blow me: 까는 소리 집어치워. 주로 상대방이 말도 안되는 소리를 할 때 장난스럽게 받아주면서 그 뒤에 나오는 말이다.",
  "Boomer: 베이비붐 세대를 뜻하는 용어지만 욕으로는 꼰대, 틀딱이라는 의미로 쓰인다.",
  "Chicken: 겁쟁이. 닭. 치킨 게임, 치킨 호크 등의 용어로 유명하다. 동사로 \"Chicken out\"이라고 하면 \"줄행랑을 놓다\"라는 뜻이다.",
  "Crook: 사기꾼. 범죄자 새끼.",
  "Damn: 사전적으로는 '젠장, 망할, 염병할, 저주받을, 빌어먹을, 제길, 지랄, 병신, 존나. God이나(God damn), it과(Damn it, Dammit 또는 God damn it, God dammit) 붙어서 나오는 일이 많다. ",
  "Dork: 사회 부적응자를 멸시하는 표현으로 '머저리'에 상통하는 단어인데, 좀 적나라하게 표현하자면 좀 모자란 찐따새끼, 뭔 생각하고 다니는지 이해가 안 가는 새끼 정도가 된다. 이렇게 보면 'Fuck' 이상급의 단어로 보이겠지만 저런 경우는 욕설, 비방을 목적으로 쓸 때 저런 뜻이 되는거고, 이 'Dork'라는 단어는 상황에 따라서 강도가 달라지기 때문에 그냥 '바보', '멍청이' 정도로 통할 때도 있다. 아니면 친한 친구 사이끼리 어리바리 까는 놈한테 \"You dork!\"라면서 낄낄대는 경우도 있다. 다만 어지간히 친한 사이도 아니면서 저런다면 싸움 날 수도 있다.  ",
  "Dumb: 바보를 의미. 질나쁜 욕설은 아니다. 원래는 벙어리를 뜻하는 말이었다. 'Dumb dumb'이라고 쓰기도 한다.",
  "Freak: 변태. 원 뜻은 괴짜 정도이지만 욕으로 쓰일 시 안 좋은 의미를 가득 담아서 '이상한 놈, 비정상적인 놈, 변태' 정도의 뜻으로 강화되므로 'F word'보다는 강도가 약하지만 엄연히 욕설이다. Control freak은 무엇이든 통제하려고 집착하는 사람을 일컫는 말. Freak out은 화가 났다는 뜻인데, 이는 주로 남한테만 쓰인다. 자기가 화가 났을 때는 be pissed off를 쓴다.",
  "Git: 멍청이. 매너없고 유치하기 짝이 없는 사람.",
  "Lunatic: 광기의, 미치광이, 정신병자(지금은 모욕적인 표현)으로 쓰인다.",
  "Salty: (주로 별 것도 아닌 것 가지고) 화가 난, 까탈스러운. 쿨찐병에 걸려 불필요하게 가시돋힌 소리를 하는 사람에게 쓰는 표현이다.",
  "Sap: 멍청한 놈",
  "Troll: 트롤링을 일삼는 사람을 뜻한다. 주로 인터넷 커뮤니티에서 많이 쓰인다.",
  "Twonk: 등신",
  "Weirdo: 이상한 놈. 괴짜같은 놈. Freak보다는 강도는 좀 약하다.",
  "Zip it: 닥쳐. 시끄러워.",
];

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    position: 'relative',
  },
  topLeftButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: '#6200ea',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  quoteBox: {
    background: '#fff',
    padding: '20px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
  },
  quoteText: {
    fontSize: '1.5rem',
    fontStyle: 'italic',
    color: '#333',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
  },
  quoteButton: {
    background: '#6200ea',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  quoteButtonHover: {
    background: '#3700b3',
  },
};

function Yok() {
  const [quote, setQuote] = useState(quotes[0]);
  const navigate = useNavigate();

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div style={styles.container}>

      <button style={styles.topLeftButton} onClick={() => navigate('/main')}>
        뒤로가기
      </button>

      <div style={styles.quoteBox}>
        <p style={styles.quoteText}>{quote}</p>
        <button style={styles.quoteButton} onClick={handleClick}>
          다음 욕이 궁긍하면?
        </button>
      </div>
    </div>
  );
}

export default Yok;
