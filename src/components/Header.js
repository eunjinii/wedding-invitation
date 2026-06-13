import React from 'react';

const Header = () => {
    return (
        <header style={headerContainerStyle}>
            {/* 신랑 & 신부 이름 */}

            <div style={archWrapperStyle}>
                <svg viewBox="0 0 500 120" style={svgStyle}>
                    <defs>
                        <path id="textArchPath" d="M 50,140 A 250,250 0 0,1 450,140" fill="none" />
                    </defs>
                    <text style={archTextStyle} textLength="340" lengthAdjust="spacing">
                        <textPath href="#textArchPath" startOffset="50%" textAnchor="middle">
                            SAVE THE DATE
                        </textPath>
                    </text>
                </svg>
            </div>

            <p style={forTheWeddingStyle}>for the wedding of</p>
            <h1 style={titleStyle}>
                <span style={nameBoxStyle}>배준식</span>
                <span style={ampersandStyle}>&</span>
                <span style={nameBoxStyle}>이은진</span>
            </h1>

            {/* 중앙 세로 구분선 */}
            <div style={verticalLineStyle}></div>

            {/* 일시 및 장소 정보 */}
            <p style={infoStyle}>2026년 08월 22일 토요일 오후 12시</p>
            <p style={infoStyle}>논현2동성당</p>
        </header>
    );
};

// --- 스타일 객체 모음 ---

const headerContainerStyle = {
    marginTop: '80px',
    marginBottom: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
};

const archWrapperStyle = {
    width: '100%',
    maxWidth: '350px',
    margin: '0 auto',
    marginBottom: '-10px', // SVG 높이가 늘어난 만큼 마진을 살짝 조절했습니다.
};

const svgStyle = {
    width: '100%',
    height: 'auto',
    overflow: 'visible', // 만에 하나 폰트가 튀어나가도 잘리지 않도록 안전장치 추가
};

const archTextStyle = {
    fill: '#ff4d4d',
    fontSize: '32px',       // 글자 크기를 살짝 키워 가독성을 올렸습니다.
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'GowunBatang, serif', // 적용 중이신 폰트 명시
};

const forTheWeddingStyle = {
    fontSize: '0.9rem',
    color: '#888',
    marginBottom: '30px'
};

const titleStyle = {
    fontSize: '1.8rem',
    fontWeight: '300',
    letterSpacing: '3px',
};

const nameBoxStyle = {
    padding: '5px 10px'
};

const ampersandStyle = {
    fontSize: '1.2rem',
};

const verticalLineStyle = {
    margin: '50px 0',
    width: '1px',
    height: '80px',
    backgroundColor: "#ddd"
};

const infoStyle = {
    marginTop: '8px',
    fontSize: '1.2rem',
    letterSpacing: '1px'
};

export default Header;