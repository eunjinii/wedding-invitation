import React from 'react';
import Contact from './Contact';

const Invitation = () => {
    return (
        <section style={containerStyle}>
            {/* 인사말 제목 (작은 꽃 장식 같은 느낌) */}
            <div style={titleContainerStyle}>
                <div style={titleStyle}>Invitation</div>
                <div style={verticalLineStyle}></div>
            </div>

            {/* 메인 문구 */}
            <div style={contentBoxStyle}>
                <p style={paragraphStyle}>싱그러운 여름 향기 가득한 날,</p>
                <p style={paragraphStyle}>저희 두 사람이 사랑과 신뢰로</p>
                <p style={paragraphStyle}>인생의 새로운 출발을 하려 합니다.</p>
                <br />
                <p style={paragraphStyle}>그 시작의 순간에 함께하시어</p>
                <p style={paragraphStyle}>따뜻한 축복과 격려를 나누어 주시면</p>
                <p style={paragraphStyle}>더없는 기쁨으로 간직하겠습니다.</p>
            </div>

            {/* 혼주 및 신랑신부 정보 */}
            <div style={familyBoxStyle}>
                <div style={familyRowStyle}>
                    <span style={parentStyle}>배연도 · 이금자</span>
                    <span style={relationStyle}>의 장남</span>
                    <span style={nameStyle}>준식</span>
                </div>
                <div style={familyRowStyle}>
                    <span style={parentStyle}>이상정 · 김영숙</span>
                    <span style={relationStyle}>의 차녀</span>
                    <span style={nameStyle}>은진</span>
                </div>
            </div>
            <Contact />
        </section>
    );
};

// --- 스타일 객체 모음 ---

const containerStyle = {
    padding: '60px 20px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
};

const titleContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
}

const titleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ff4d4d',
    marginBottom: '10px',
    letterSpacing: '2px'
};

const verticalLineStyle = {
    marginTop: '10px',
    marginBottom: '20px',
    width: '30px',
    height: '1px',
    backgroundColor: "#ddd"
};

const contentBoxStyle = {
    margin: '30px 0',
    lineHeight: '2.2', // 행간을 넉넉히 주어 여유로운 느낌
};

const paragraphStyle = {
    fontSize: '1.2rem',
    color: '#333',
    margin: '0',
    letterSpacing: '0.5px'
};

const familyBoxStyle = {
    display: 'inline-block',
    marginTop: '20px',
    textAlign: 'left', // 이름 부분은 왼쪽 정렬이 더 정갈함
};

const familyRowStyle = {
    fontSize: '1.2rem',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // 전체는 중앙
    gap: '8px'
};

const parentStyle = {
    fontWeight: '400',
    color: '#333',
    minWidth: '100px', // 부모님 성함 너비 고정으로 줄맞춤
    textAlign: 'right'
};

const relationStyle = {
    fontSize: '1rem',
    color: '#888',
};

const nameStyle = {
    fontWeight: 'bold', // 본인 이름 강조
    fontSize: '1.2rem',
    color: '#1a1a1a',
    minWidth: '50px'
};

export default Invitation;