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

    // 💡 스와이프 구현을 위한 터치 시작 X좌표 저장용 useRef
    const touchStartX = useRef(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    // 💡 터치 시작 이벤트 핸들러
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    // 💡 터치 종료 이벤트 핸들러 (어느 방향으로 밀었는지 계산)
    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX.current - touchEndX;

        // 너무 미세하게 스친 건 오작동 방지를 위해 무시 (50px 이상 움직였을 때만 작동)
        const swipeThreshold = 50;

        if (diffX > swipeThreshold) {
            // 오른쪽에서 왼쪽으로 밀었을 때 -> 다음 사진
            handleNext();
        } else if (diffX < -swipeThreshold) {
            // 왼쪽에서 오른쪽으로 밀었을 때 -> 이전 사진
            handlePrev();
        }
    };

    // 썸네일 자동 스크롤 연동 기능 (기존 유지)
    useEffect(() => {
        if (!thumbnailRef.current) return;
        const container = thumbnailRef.current;
        const selectedThumbnail = container.children[currentIndex];

        if (selectedThumbnail) {
            const containerWidth = container.offsetWidth;
            const thumbnailWidth = selectedThumbnail.offsetWidth;
            const thumbnailLeft = selectedThumbnail.offsetLeft;
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

            {/* 📸 2. 대표 이미지 (메인 뷰어 - 여기에 터치 이벤트 주입!) */}
            <div
                style={mainViewerStyle}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <button onClick={handlePrev} style={{ ...navBtnStyle, left: '10px' }}>&#10094;</button>
                <button onClick={handleNext} style={{ ...navBtnStyle, right: '10px' }}>&#10095;</button>

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

const containerStyle = {
    padding: '60px 0', // 💡 중요: 좌우 패딩을 0으로 만들어 사진이 꽉 찰 공간 확보
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    overflowX: 'hidden' // 100vw 탈출 시 스크롤바 방지
};

const titleContainerStyle = {
    padding: '0px 20px 10px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
}

const titleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#16589A',
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
    width: '100vw',               // 화면 가로 꽉 채우기
    maxWidth: '500px',            // PC 마지노선은 유지 (없으면 PC에서 사진이 터짐)
    aspectRatio: '3 / 4',         // 💡 정밀한 정사각 혹은 비율 유지 (500px 고정 대신 비율로 처리)
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    touchAction: 'pan-y'
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
    color: '#aaa',
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