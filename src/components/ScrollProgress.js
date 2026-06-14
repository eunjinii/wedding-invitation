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
    top: '40px',
    right: '20px',
    width: '3px',
    height: '60px',
    backgroundColor: '#eee',
    borderRadius: '2px',
    zIndex: 9999,
    overflow: 'hidden'
};

const progressStyle = {
    width: '100%',
    backgroundColor: '#16589A',
    transition: 'height 0s '
};

export default ScrollProgress;