import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, increment, setDoc, getDoc } from "firebase/firestore";
import confetti from 'canvas-confetti';

const LikeButton = () => {
    const [likes, setLikes] = useState(0);
    const isDev = process.env.NODE_ENV === 'development';
    const statsRef = doc(db, isDev ? "stats_dev" : "stats", "hearts");

    // Firestore 데이터 로드 및 실시간 감시
    useEffect(() => {
        const setupLikes = async () => {
            const docSnap = await getDoc(statsRef);
            if (!docSnap.exists()) await setDoc(statsRef, { count: 0 });

            const unsubscribe = onSnapshot(statsRef, (doc) => {
                if (doc.exists()) setLikes(doc.data().count);
            });
            return unsubscribe;
        };
        setupLikes();
    }, []);

    const handleLike = async () => {
        confetti({
            particleCount: 200,
            angle: 100,
            spread: 80,
            drift: -1,
            origin: { x: 0.95, y: 0.9 }, // 고정 버튼 위치 근처에서 터지게
            colors: ['#ff4d4d', '#ffcccc', '#ffd700', '#ffffff'],
            scalar: 1
        });

        try {
            await updateDoc(statsRef, { count: increment(1) });
        } catch (e) { console.error(e); }
    };

    return (
        <div>
            {/* 1. ✨ 스무스한 애니메이션과 스타일 주입 */}
            <style>
                {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); } /* 콩! 올라감 */
          }
          .floating-like-btn {
            position: fixed;
            bottom: 30px; /* 아래여백 */
            right: 20px;  /* 우측여백 */
            background-color: #16589A;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 10px #16589A;
            cursor: pointer;
            z-index: 999; /* 다른 콘텐츠 위에 띄움 */
            outline: none;
            transition: transform 0.1s ease-in-out;
            animation: bounce 1.8s ease-in-out infinite; /* 콩콩 애니메이션 */
            font-family: sans-serif;
            font-weight: bold;
          }
          .floating-like-btn:active {
            transform: scale(1.1); /* 클릭 시 살짝 커짐 */
          }
        `}
            </style>

            {/* 2. 💖 고정된 버튼 (요청하신 모양) */}
            <button style={buttonContainer} onClick={handleLike} className="floating-like-btn">
                <span style={heartStyle}>🤍</span>
                <span style={countStyle}>{likes}</span>
            </button>
        </div>
    );
};

const buttonContainer = {
    position: 'fixed',
    bottom: '30px',
    right: '20px',
    backgroundColor: '#16589A',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '10px 14px',     // 👈 위아래/양옆 패딩 밸런스를 동글동글하게 조절
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '1px',               // 👈 6px에서 1px로 대폭 줄여서 사이 간격을 좁힙니다!
    boxShadow: '0 4px 12px rgba(22, 88, 154, 0.3)', // 그림자를 조금 더 부드럽고 세련되게 수정
    cursor: 'pointer',
    zIndex: 999,
    outline: 'none',
    transition: 'transform 0.1s ease-in-out',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    lineHeight: '1'
}

const heartStyle = {
    fontSize: '1.2rem',
};

const countStyle = {
    fontSize: '0.8rem',
    fontWeight: 'light',

}

export default LikeButton;