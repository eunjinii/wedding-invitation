import React, { useState, useRef } from 'react';

const Gallery = () => {
    const imageNames = [
        "NSH_0133.png", "NSH_0338.png", "NSH_0425.png", "NSH_0594.png",
        "NSH_0714.png", "NSH_0786.png", "NSH_1057.png", "NSH_1103.png",
        "NSH_1255.png", "NSH_1495.png", "NSH_1518.png", "NSH_1589.png",
        "NSH_1835.png", "NSH_2081.png", "NSH_2257.png", "NSH_2319.png",
        "NSH_2765.png", "NSH_2896.png"
    ];

    const images = imageNames.map((name, index) => ({
        id: index + 1,
        src: `${process.env.PUBLIC_URL}/images/gallery/${name}`
    }));

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 이미지 인덱스
    const thumbnailRef = useRef(null); // 썸네일 스크롤 제어용

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section style={containerStyle}>
            <div style={titleContainerStyle}>
                <div style={titleStyle}>Gallery</div>
                <div style={verticalLineStyle}></div>
            </div>
            {/* 📸 2. 대표 이미지 (메인 뷰어) */}
            <div style={mainViewerStyle}>
                <button onClick={handlePrev} style={{ ...navBtnStyle, left: '10px' }}>&#10094;</button>
                <button onClick={handleNext} style={{ ...navBtnStyle, right: '10px' }}>&#10095;</button>

                <img
                    key={images[currentIndex].id} // key를 바꿔주어야 애니메이션이 작동함
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    style={mainImageStyle}
                />
            </div>

            {/* 🎞️ 3. 하단 썸네일 슬라이드 */}
            <div ref={thumbnailRef} style={thumbnailSliderStyle}>
                {images.map((img, index) => (
                    <img
                        key={img.id}
                        src={img.src}
                        alt={`썸네일 ${img.id}`}
                        onClick={() => handleThumbnailClick(index)}
                        style={{
                            ...thumbnailImageStyle,

                            border: currentIndex === index ? '2px solid #ff4d4d' : '2px solid transparent',
                            opacity: currentIndex === index ? 1 : 0.6
                        }}
                    />
                ))}
            </div>

            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px' }}>
                {currentIndex + 1} / {images.length}
            </p>
        </section>
    );
};

const containerStyle = {
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
};

const titleContainerStyle = {
    padding: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
}

const titleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ff4d4d',
    letterSpacing: '2px'
};

const verticalLineStyle = {
    marginTop: '10px',
    marginBottom: '20px',
    width: '30px',
    height: '1px',
    backgroundColor: "#ddd"
};

const mainViewerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    height: '500px',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const mainImageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    animation: 'fadeIn 0.5s ease',
};

// 네비게이션 버튼 스타일 (반투명 원형)
const navBtnStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#333',
    border: 'none',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    fontSize: '1.2rem',
    cursor: 'pointer',
    zIndex: 10,
    outline: 'none',
    transition: 'background-color 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    WebkitTapHighlightColor: 'transparent'
};

const thumbnailSliderStyle = {
    display: 'flex',
    gap: '4px',
    marginTop: '10px',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    overflowX: 'auto',
    padding: '5px 0',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
};

// 썸네일 이미지 스타일
const thumbnailImageStyle = {
    width: '93px',
    height: '115px',
    backgroundColor: '#e0e0e0', // 로딩 전 임시 색상
    objectFit: 'cover',
    // borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0, // 찌그러짐 방지
};

// 페이드인 애니메이션 정의 (CSS 파일에 넣어도 됨)
const injectStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        /* 스크롤바 숨기기 (크롬, 사파리) */
        div::-webkit-scrollbar {
            display: none;
        }
    `;
    document.head.appendChild(style);
};
injectStyles(); // 스타일 주입

export default Gallery;