import React, { useState, useEffect, useRef } from 'react';

const Gallery = () => {
    const imageNames = [
        "01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg", "05.jpeg",
        "06.jpeg", "07.jpeg", "08.jpeg", "10.jpeg", "11.jpeg", "12.jpeg",
        "13.jpeg", "14.jpeg", "15.jpeg",
        "16.jpeg", "18.jpeg", "19.jpeg"
    ];

    const images = imageNames.map((name, index) => ({
        id: index + 1,
        src: `${process.env.PUBLIC_URL}/images/gallery/${name}`
    }));

    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbnailRef = useRef(null);

    // 💡 스와이프 관련 touchStartX 변수 및 터치 핸들러(Start/End) 함수들을 완전히 걷어냈습니다!

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    // 하단 썸네일 정중앙 조준 스크롤 연동 (기존 유지)
    useEffect(() => {
        if (!thumbnailRef.current) return;

        const container = thumbnailRef.current;
        const selectedThumbnail = container.children[currentIndex];

        if (selectedThumbnail) {
            const containerWidth = container.clientWidth;
            const thumbnailWidth = selectedThumbnail.clientWidth;
            const thumbnailLeft = selectedThumbnail.offsetLeft - container.offsetLeft;
            const targetScrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2);

            container.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    return (
        <section style={containerStyle}>
            <div style={titleContainerStyle}>
                <div style={titleStyle}>Gallery</div>
                <div style={verticalLineStyle}></div>
            </div>

            {/* 📸 2. 대표 이미지 메인 뷰어 (터치 스와이프 이벤트를 삭제하여 확대 기능에 집중) */}
            <div style={mainViewerStyle}>
                <button onClick={handlePrev} style={{ ...navBtnStyle, left: '15px' }}>
                    <span style={{
                        ...arrowIconStyle,
                        transform: 'rotate(225deg)',
                        marginLeft: '3px' // 💡 착시 보정을 위한 미세 이동
                    }} />
                </button>

                {/* ▶️ 오른쪽 버튼: 중앙 정렬을 위해 왼쪽으로 2px 살짝 밀어줌 */}
                <button onClick={handleNext} style={{ ...navBtnStyle, right: '15px' }}>
                    <span style={{
                        ...arrowIconStyle,
                        transform: 'rotate(45deg)',
                        marginRight: '3px' // 💡 착시 보정을 위한 미세 이동
                    }} />
                </button>
                <img
                    key={images[currentIndex].id}
                    src={images[currentIndex].src}
                    alt={`갤러리 메인 ${images[currentIndex].id}`}
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
                            border: currentIndex === index ? '2px solid #16589A' : '2px solid transparent',
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

// --- 스타일 구조 튜닝 ---

const containerStyle = {
    padding: '60px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    overflowX: 'hidden'
};

const titleContainerStyle = {
    padding: '0px 20px 10px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
};

const titleStyle = { fontSize: '1rem', fontWeight: 'bold', color: '#16589A', letterSpacing: '2px' };
const verticalLineStyle = { marginTop: '10px', marginBottom: '20px', width: '30px', height: '1px', backgroundColor: "#ddd" };

const mainViewerStyle = {
    position: 'relative',
    width: '100vw',
    maxWidth: '500px',
    aspectRatio: '3 / 4',
    overflow: 'visible', // 💡 변경: hidden에서 visible로 변경하여 화면 확대 시 이미지가 잘리지 않고 삐져나갈 수 있게 처리
    backgroundColor: '#fafafa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // 💡 auto로 설정하여 핀치 줌을 포함한 스마트폰 브라우저 고유의 모든 터치 액션을 방해 없이 완벽 허용합니다.
    touchAction: 'auto'
};

const mainImageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    animation: 'fadeIn 0.5s ease',

    WebkitUserDrag: 'none'
};
const navBtnStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // 은은한 반투명
    border: 'none',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    WebkitTapHighlightColor: 'transparent',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)' // 은은한 그림자
};

// 💡 얇고 깨끗한 꺾쇠 선 스타일
const arrowIconStyle = {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderTop: '2px solid #16589A',
    borderRight: '2px solid #16589A',
    boxSizing: 'border-box',
    // marginLeft: '2px' // 정중앙 시각 정렬 보정
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

const thumbnailImageStyle = {
    width: '93px',
    height: '115px',
    backgroundColor: '#e0e0e0',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
};

const injectStyles = () => {
    if (document.getElementById('gallery-inline-style')) return;
    const style = document.createElement('style');
    style.id = 'gallery-inline-style';
    style.innerHTML = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        div::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
};
injectStyles();

export default Gallery;