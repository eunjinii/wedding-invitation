import React, { useState, useEffect } from 'react';

const DDay = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const weddingDate = new Date("2026-08-22T00:00:00").getTime();
        const now = new Date().getTime();
        const difference = weddingDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = null; // 날짜가 지났을 때
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={containerStyle}>
            {timeLeft ? (
                <div style={timerContainerStyle}>
                    <div style={unitBoxStyle}>
                        <span style={numberStyle}>{timeLeft.days}</span>
                        <span style={labelStyle}>DAYS</span>
                    </div>
                    <div style={colonStyle}>:</div>
                    <div style={unitBoxStyle}>
                        <span style={numberStyle}>{timeLeft.hours.toString().padStart(2, '0')}</span>
                        <span style={labelStyle}>HOUR</span>
                    </div>
                    <div style={colonStyle}>:</div>
                    <div style={unitBoxStyle}>
                        <span style={numberStyle}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                        <span style={labelStyle}>MIN</span>
                    </div>
                    <div style={colonStyle}>:</div>
                    <div style={unitBoxStyle}>
                        <span style={numberStyle}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        <span style={labelStyle}>SEC</span>
                    </div>
                </div>
            ) : (
                <div style={weddingDayStyle}>🎉 Happy Wedding Day! 🎉</div>
            )}
        </div>
    );
};

// --- 스타일링 ---
const containerStyle = {
    // position: 'relative',
    // maxWidth: '450px',
    margin: '60px 0',
    textAlign: 'center',
    padding: '0 20px',
};

const timerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
};

const unitBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50px'
};

const numberStyle = {
    fontSize: '2rem',
    fontWeight: '300',
    color: '#333'
};

const labelStyle = {
    fontSize: '0.8rem',
    color: '#777',
    marginTop: '5px'
};

const colonStyle = {
    fontSize: '1.2rem',
    color: '#aaa',
    paddingBottom: '20px'
};

const descStyle = {
    marginTop: '25px',
    fontSize: '0.95rem',
    color: '#555',
    fontWeight: '400'
};

const weddingDayStyle = {
    fontSize: '1.5rem',
    color: '#ff4d4d',
    fontWeight: 'bold'
};

export default DDay;