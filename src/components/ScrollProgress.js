import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (docHeight > 0) {
                const percent = (scrollTop / docHeight) * 100;
                setScrollPercent(percent);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={containerStyle}>
            {/* 스크롤에 따라 높이가 변하는 동적 게이지 바 */}
            <div style={{ ...progressStyle, height: `${scrollPercent}%` }} />
        </div>
    );
};

// ─── 스타일 객체 ───
const containerStyle = {
    position: 'fixed',
    top: '40px',             // 햄버거 메뉴나 상단 요소 밸런스에 맞춘 위치
    right: '25px',            // 화면 우측 여백
    width: '3px',             // 선 두께 (은은하고 조그맣게)
    height: '60px',           // 전체 인디케이터 트랙의 총 세로 길이
    backgroundColor: '#eee',  // 아직 스크롤되지 않은 기본 트랙 색상
    borderRadius: '2px',
    zIndex: 9999,             // 화면 최상단 고정
    overflow: 'hidden'
};

const progressStyle = {
    width: '100%',
    backgroundColor: '#16589A', // 청첩장 메인 포인트 컬러와 통일
    transition: 'height 0.1s ease-out' // 부드럽게 차오르는 애니메이션 효과
};

export default ScrollProgress;