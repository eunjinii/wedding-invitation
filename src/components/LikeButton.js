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
    }, [statsRef]);

    // 클릭 시 꽃가루 팡! 효과
    const handleLike = async () => {
        confetti({
            particleCount: 400,
            angle: 130,
            spread: 110,
            drift: -1,
            origin: { x: 0.9, y: 0.85 }, // 고정 버튼 위치 근처에서 터지게
            colors: ['#ff4d4d', '#ffcccc', '#ffd700', '#ffffff'],
            scalar: 1.4
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
            background-color: #ff4d4d;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 15px rgba(255, 77, 77, 0.4);
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
            <button onClick={handleLike} className="floating-like-btn">
                <span style={{ fontSize: '1.2rem' }}>{likes}</span>
                <span style={{ fontSize: '1.2rem', marginLeft: '2px' }}>❤️</span>
            </button>
        </div>
    );
};

export default LikeButton;