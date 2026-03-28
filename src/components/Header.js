import React from 'react';

const Header = () => {
    return (
        <header style={headerContainerStyle}>
            {/* 신랑 & 신부 이름 */}

            <div style={archWrapperStyle}>
                {/* 둥근 아치형 SVG (텍스트 + 벚꽃 잎) */}
                <svg viewBox="0 0 500 120" style={svgStyle}>
                    {/* A. 텍스트가 따라갈 투명한 곡선 경로 정의 */}
                    <defs>
                        <path id="textArchPath" d="M 50,150 A 200,100 0 0,1 450,150" fill="none" />
                    </defs>

                    {/* B. 아치형 텍스트 */}
                    <text style={archTextStyle}>
                        <textPath href="#textArchPath" startOffset="50%" textAnchor="middle">
                            SAVE THE DAY
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
            <p style={infoStyle}>논현2동 성당</p>
        </header>
    );
};

// --- 스타일 객체 모음 ---

const headerContainerStyle = {
    marginTop: '80px', // 아치형 추가로 상단 여백을 살짝 줄임
    marginBottom: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
};

// 아치 전체를 감싸는 컨테이너
const archWrapperStyle = {
    width: '100%',
    maxWidth: '350px', // PC에서도 너무 커지지 않게 제한
    margin: '0 auto',
    marginBottom: '-20px', // 아래 요소와의 간격을 좁힘
};

// SVG 자체 스타일 (반응형)
const svgStyle = {
    width: '100%',
    height: 'auto',
};

// 아치형 텍스트 스타일
const archTextStyle = {
    fill: '#ff4d4d',       // 포인트 컬러 (좋아요 버튼과 통일)
    fontSize: '30px',       // SVG 내부 크기
    fontWeight: '700',      // Bold
    letterSpacing: '10px',   // 자간을 넓혀서 가독성 확보
    textTransform: 'uppercase', // 대문자 고정
    opacity: 0.9,
};

const forTheWeddingStyle = {
    fontSize: '0.9rem',
    color: '#888',
    marginBottom: '10px'
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
    // color: '#aaa'
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

// const locationStyle = {
//     // color: '#888',
//     marginTop: '5px',
//     fontSize: '1.2rem',
//     fontWeight: '400'
// };

const churchImageStyle = {
    marginTop: '30px',
    width: '100%',
    maxWidth: '350px',
    height: 'auto',
    borderRadius: '12px',
};

export default Header;