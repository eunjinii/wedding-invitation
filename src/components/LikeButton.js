import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, increment, setDoc, getDoc } from "firebase/firestore";
import confetti from 'canvas-confetti';

const LikeButton = () => {
    const [likes, setLikes] = useState(0);
    const isDev = process.env.NODE_ENV === 'development';
    const statsRef = doc(db, isDev ? "stats_dev" : "stats", "hearts");

    useEffect(() => {
        // 💡 1. 비동기 getDoc/setDoc 없이, onSnapshot 자체로 문서 존재 여부까지 한 번에 실시간 감시합니다.
        const unsubscribe = onSnapshot(statsRef, async (docSnap) => {
            if (docSnap.exists()) {
                // 문서가 있으면 정상적으로 상태 업데이트
                setLikes(docSnap.data().count);
            } else {
                // 💡 2. 만약 최초 실행이라 데이터(문서)가 없다면 안전하게 0으로 초기화 생성
                try {
                    await setDoc(statsRef, { count: 0 });
                } catch (e) {
                    console.error("초기 문서 생성 실패:", e);
                }
            }
        }, (error) => {
            console.error("Firestore 실시간 감시 에러:", error);
        });

        // 💡 3. 동기적으로 확실하게 unsubscribe 함수를 리턴하여 리액트 생명주기를 맞춰줍니다.
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const handleLike = async () => {
        // 💡 반응형 대응: 클릭하는 순간의 화면 가로 크기를 계산해 버튼 위치 정밀 타격
        const originX = window.innerWidth > 500 ? (window.innerWidth - 20) / window.innerWidth : 0.9;

        confetti({
            particleCount: 150,
            angle: 110,           // 왼쪽 위 방향으로 비스듬히 뿜어지도록 각도 미세조정
            spread: 70,
            drift: -0.5,
            origin: { x: originX, y: 0.85 },

            // 🌸 #16589A 시그니처 블루와 고급스럽게 어우러지는 화려한 컬러칩 배치
            colors: [
                '#16589A', // 메인 딥블루
                '#6BA4D9', // 화사한 스카이블루
                '#A4B9D0', // 톤다운 소프트블루
                '#FFD700', // 축하 분위기를 돋우는 골드 포인트
                '#FFFFFF'  // 청량감을 주는 화이트
            ],
            scalar: 1.1           // 플레이크 크기를 아주 살짝 키워 시각적 화려함 극대화
        });

        try {
            await updateDoc(statsRef, { count: increment(1) });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            {/* 키프레임 애니메이션 주입 (App.css에 옮겨 적으셔도 무방합니다) */}
            <style>
                {`
                    @keyframes floatingBounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }
                    .floating-like-btn {
                        animation: floatingBounce 2s ease-in-out infinite;
                        -webkit-tap-highlight-color: transparent; /* 모바일 터치 하이라이트 제거 */
                    }
                    .floating-like-btn:active {
                        transform: scale(0.92) !important; /* 클릭 맛을 살리는 쿠션 효과 */
                        transition: transform 0.05s ease;
                    }
                `}
            </style>

            <button
                style={buttonStyle}
                onClick={handleLike}
                className="floating-like-btn"
                aria-label="좋아요 누르기"
            >
                <span style={heartStyle}>🤍</span>
                <span style={countStyle}>{likes}</span>
            </button>
        </div>
    );
};

// --- 스타일 구조 정돈 ---
const buttonStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '20px',
    width: '56px',             // 가로세로 규격을 고정하여 더 완벽한 동그라미 유도
    height: '56px',
    backgroundColor: '#16589A',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    boxShadow: '0 4px 14px rgba(22, 88, 154, 0.4)',
    cursor: 'pointer',
    zIndex: 999,
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", sans-serif',
    fontWeight: '600',
    lineHeight: '1',
    transition: 'transform 0.2s ease-in-out, background-color 0.2s',
};

const heartStyle = {
    fontSize: '1.2rem',
};

const countStyle = {
    fontSize: '0.75rem',
    letterSpacing: '0.5px'
};

export default LikeButton;