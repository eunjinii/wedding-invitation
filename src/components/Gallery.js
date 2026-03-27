import React, { useState, useRef } from 'react';

const Gallery = () => {
    // 1. 임시 이미지 데이터 (나중에 실제 이미지 URL로 교체하세요)
    const images = [
        { id: 1, src: 'https://via.placeholder.com/600x800/ffcccc/ffffff?text=Wedding+Photo+1', alt: '웨딩 사진 1' },
        { id: 2, src: 'https://via.placeholder.com/600x800/ccffcc/ffffff?text=Wedding+Photo+2', alt: '웨딩 사진 2' },
        { id: 3, src: 'https://via.placeholder.com/600x800/ccccff/ffffff?text=Wedding+Photo+3', alt: '웨딩 사진 3' },
        { id: 4, src: 'https://via.placeholder.com/600x800/ffedcc/ffffff?text=Wedding+Photo+4', alt: '웨딩 사진 4' },
        { id: 5, src: 'https://via.placeholder.com/600x800/cceffd/ffffff?text=Wedding+Photo+5', alt: '웨딩 사진 5' },
        { id: 6, src: 'https://via.placeholder.com/600x800/cceffd/ffffff?text=Wedding+Photo+6', alt: '웨딩 사진 6' },
        { id: 7, src: 'https://via.placeholder.com/600x800/cceffd/ffffff?text=Wedding+Photo+7', alt: '웨딩 사진 7' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 이미지 인덱스
    const thumbnailRef = useRef(null); // 썸네일 스크롤 제어용

    // 이전/다음 이미지로 이동하는 함수
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // 썸네일 클릭 시 해당 이미지로 이동
    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div style={{ margin: '50px 0', padding: '0 20px', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '20px', color: '#555' }}>Gallery</h4>

            {/* 📸 2. 대표 이미지 (메인 뷰어) */}
            <div style={mainViewerStyle}>
                {/* 좌우 네비게이션 버튼 (모바일에서도 터치 가능하도록 큼직하게) */}
                <button onClick={handlePrev} style={{ ...navBtnStyle, left: '10px' }}>&#10094;</button>
                <button onClick={handleNext} style={{ ...navBtnStyle, right: '10px' }}>&#10095;</button>

                {/* 현재 이미지 표시 (부드러운 페이드 효과 추가) */}
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
                            // 현재 선택된 썸네일에 하이라이트 효과
                            border: currentIndex === index ? '2px solid #ff4d4d' : '2px solid transparent',
                            opacity: currentIndex === index ? 1 : 0.6
                        }}
                    />
                ))}
            </div>

            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px' }}>
                {currentIndex + 1} / {images.length}
            </p>
        </div>
    );
};

// --- 스타일링 (CSS-in-JS) ---

// 메인 뷰어 컨테이너 (상대 좌표 설정)
const mainViewerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '500px', // PC에서도 너무 커지지 않게 제한
    margin: '0 auto',
    aspectRatio: '3 / 4', // 세로 사진 비율 고정 (요즘 트렌드)
    overflow: 'hidden',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    backgroundColor: '#f5f5f5', // 로딩 전 임시 색상
};

// 메인 이미지 스타일 (부드러운 전환 효과)
const mainImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // 이미지가 꽉 차게 (비율 유지하며 자름)
    animation: 'fadeIn 0.5s ease', // 페이드인 애니메이션
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
    WebkitTapHighlightColor: 'transparent' // 모바일 터치 하이라이트 제거
};

// 썸네일 슬라이더 컨테이너 (가로 스크롤 허용)
const thumbnailSliderStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    overflowX: 'auto', // 가로 스크롤 활성화
    padding: '5px 0',
    WebkitOverflowScrolling: 'touch', // iOS 부드러운 스크롤
    msOverflowStyle: 'none', // IE 스크롤바 숨기기
    scrollbarWidth: 'none', // 파이어폭스 스크롤바 숨기기
};

// 썸네일 이미지 스타일
const thumbnailImageStyle = {
    width: '96px',
    height: '96px',
    backgroundColor: '#e0e0e0', // 로딩 전 임시 색상
    objectFit: 'cover',
    borderRadius: '8px',
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