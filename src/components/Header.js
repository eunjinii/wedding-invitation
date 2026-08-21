import React from 'react';
import DDay from './DDay';

const Header = () => {
    return (
        <section style={containerStyle}>
            <img
                style={archDecorImageStyle}
                src={`${process.env.PUBLIC_URL}/images/arch-decor.png`}
                alt="아치 장식"
            />

            <svg viewBox="0 0 500 100" style={svgStyle}>
                <defs>
                    <path id="textArchPath" d="M 110,160 A 140,140 0 0,1 390,160" fill="none" />
                </defs>
                <text style={archTextStyle} textLength="260" lengthAdjust="spacing">
                    <textPath href="#textArchPath" startOffset="50%" textAnchor="middle">
                        SAVE THE DATE
                    </textPath>
                </text>
            </svg>

            <p style={forTheWeddingContainer}>
                for the wedding of
            </p>

            <h1 style={nameBoxContainer}>
                <span style={nameBoxStyle}>배준식</span>
                <span style={ampersandStyle}>·</span>
                <span style={nameBoxStyle}>이은진</span>
            </h1>

            <p style={weMarryStyle}>결혼합니다.</p>

            <div style={infoContainer}>
                <div style={infoStyle}>2026년 08월 22일 토요일 12시 </div>
                <div style={infoStyle}><b>천주교 논현2동 성당</b></div>
            </div>

            <DDay />
        </section>
    );
};

// --- 스타일 객체 모음 ---

const containerStyle = {
    position: 'relative',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden'
};

// 🌸 아치 데코 이미지 스타일 수정 (레이어 뒤로 밀기)
const archDecorImageStyle = {
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '115vw',
    maxWidth: '550px',
    height: 'auto',
    zIndex: 1,
    pointerEvents: 'none'
};

// SAVE THE DATE 텍스트가 들어갈 SVG 스타일
const svgStyle = {
    width: '100%',
    maxWidth: '350px',
    height: 'auto',
    margin: '0 auto',
    zIndex: 2,
    marginTop: '130px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'visible',
};
const archTextStyle = {
    fill: '#16589A',
    fontSize: '32px',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'GowunBatang, serif',
};

// for the wedding of 텍스트 스타일
const forTheWeddingContainer = {
    marginTop: '6px',
    fontSize: '0.8rem',
    color: '#888',
    letterSpacing: '5px',
};


// =============== 3. 신랑 & 신부 이름 상자
const nameBoxContainer = {
    marginTop: '58px',
    fontSize: '1.9rem',
    fontWeight: '300',
    letterSpacing: '4px',
};
const nameBoxStyle = {
    padding: '0 8px',
};

const ampersandStyle = {
    fontSize: '2rem',
};

const weMarryStyle = {
    marginTop: '8px',
    fontSize: '1.2rem',
    letterSpacing: '1px',
    // color: '#888',
};

// =============== 4. 날짜 및 장소 정보
const infoContainer = {
    marginTop: '60px',

}
const infoStyle = {
    marginTop: '8px',
    fontSize: '1.2rem',
    letterSpacing: '1px',
    padding: '0 20px',
};

export default Header;