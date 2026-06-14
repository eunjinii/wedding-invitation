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

            <img
                src={`${process.env.PUBLIC_URL}/images/under-decor.png`}
                alt='꽃 장식'
                style={decorStyle}
            />

            <div style={contentBoxStyle}>
                <p style={paragraphStyle}>우연처럼 다가온 인연이</p>
                <p style={paragraphStyle}>서로의 삶에 스며들어</p>
                <p style={paragraphStyle}>부부로서의 연을 맺고자 합니다.</p>
                <div style={brStyle} />
                <p style={paragraphStyle}>그 시작의 순간에 함께하시어</p>
                <p style={paragraphStyle}>따뜻한 축복과 격려를 나누어 주시면</p>
                <p style={paragraphStyle}>더없는 기쁨으로 간직하겠습니다.</p>
                <div style={brStyle} />
                <div style={familyBoxStyle}>
                    <div style={familyRowStyle}>
                        <span style={parentStyle}>배연도 · 이금자</span>
                        <span style={relationStyle}>의 아들</span>
                        <span style={nameStyle}>준식</span>
                    </div>
                    <div style={familyRowStyle}>
                        <span style={parentStyle}>이상정 · 김영숙</span>
                        <span style={relationStyle}>의 딸</span>
                        <span style={nameStyle}>은진</span>
                    </div>
                </div>
            </div>

            {/* 혼주 및 신랑신부 연락처 */}
            <Contact />
        </section>
    );
};

// --- 스타일 객체 모음 ---

const containerStyle = {
    padding: '60px 20px',
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
    color: '#16589A',
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

const decorStyle = {
    width: '70%',
    maxWidth: '280px',
    height: 'auto',
};
const contentBoxStyle = {
    margin: '30px 0',
    lineHeight: '2.1',
};

const paragraphStyle = {
    fontSize: '1.2rem',
    color: '#333',
    margin: '0',
    // letterSpacing: '0.5px'
};

const brStyle = {
    height: '24px'
};

const familyBoxStyle = {
    display: 'inline-block',
    textAlign: 'left',
};

const familyRowStyle = {
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
};

const parentStyle = {
    fontWeight: '400',
    color: '#333',
    minWidth: '100px',
    textAlign: 'right'
};

const relationStyle = {
    fontSize: '1rem',
    color: '#888',
};

const nameStyle = {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#1a1a1a',
    minWidth: '50px'
};

export default Invitation;