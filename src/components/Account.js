import React, { useState, useEffect } from 'react';

const Account = () => {
    const [openSide, setOpenSide] = useState(null); // 'groom' 또는 'bride'
    const [showToast, setShowToast] = useState(false);

    const accountData = {
        groom: {
            title: "신랑",
            color: "#f4f9ff",
            accounts: [
                { relation: "본인", bank: "국민은행", number: "123-456-789012" },
                { relation: "아버지", bank: "신한은행", number: "987-654-321098" },
                { relation: "어머니", bank: "우리은행", number: "111-222-333333" },
            ]
        },
        bride: {
            title: "신부",
            color: "#fff5f5",
            accounts: [
                { relation: "신부", bank: "카카오뱅크", number: "3333-01-1234567" },
                { relation: "아버지", bank: "농협", number: "444-5555-6666-77" },
                { relation: "어머니", bank: "기업은행", number: "888-999-000000" },
            ]
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setShowToast(true);
        });
    };

    // 알림창 자동 삭제
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <div style={{ margin: '40px auto', padding: '0 20px' }}>
            <h4 style={{ marginBottom: '20px', color: '#555' }}>마음 전하실 곳</h4>

            {/* ✨ 스무스한 토스트 알림 */}
            <div style={{
                ...toastStyle,
                opacity: showToast ? 1 : 0,
                transform: `translateX(-50%) translateY(${showToast ? '0' : '20px'})`,
                visibility: showToast ? 'visible' : 'hidden'
            }}>
                계좌번호가 복사되었습니다.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(accountData).map(([key, side]) => (
                    <div key={key} style={containerStyle}>
                        <button
                            onClick={() => setOpenSide(openSide === key ? null : key)}
                            style={{ ...headerStyle, backgroundColor: side.color }}
                        >
                            <span style={{ fontSize: '0.95rem' }}>{side.title}</span>
                            <span style={{
                                transition: 'transform 0.3s',
                                transform: openSide === key ? 'rotate(180deg)' : 'rotate(0deg)',
                                fontSize: '0.8rem', color: '#aaa'
                            }}>▼</span>
                        </button>

                        {/* ✨ 스무스한 아코디언 내용 (높이 애니메이션) */}
                        <div style={{
                            maxHeight: openSide === key ? '300px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            backgroundColor: '#fff'
                        }}>
                            <div style={{ padding: '10px 15px' }}>
                                {side.accounts.map((acc, idx) => (
                                    <div key={idx} style={accountRowStyle}>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#999' }}>{acc.relation} {acc.name}</div>
                                            <div style={{ fontSize: '0.9rem', color: '#444', marginTop: '2px' }}>{acc.bank} {acc.number}</div>
                                        </div>
                                        <button onClick={() => handleCopy(acc.number)} style={copyBtnStyle}>복사</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- 개선된 스타일 ---
const containerStyle = {
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
};

const headerStyle = {
    width: '100%',
    padding: '16px 20px',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none'
};

const accountRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #fcfcfc'
};

const copyBtnStyle = {
    padding: '6px 12px',
    fontSize: '0.7rem',
    backgroundColor: '#f8f8f8',
    color: '#666',
    border: '1px solid #eee',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s'
};

const toastStyle = {
    position: 'fixed',
    bottom: '50px', // 아래에서 위로 올라오는 느낌이 더 세련됨
    left: '50%',
    backgroundColor: 'rgba(0,0,0,0.75)',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '50px',
    fontSize: '0.85rem',
    zIndex: 9999,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // 또잉 효과
    pointerEvents: 'none'
};

export default Account;