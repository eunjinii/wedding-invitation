import React, { useState, useEffect } from 'react';

const Account = () => {
    const [openSide, setOpenSide] = useState(null); // 'groom' 또는 'bride'
    const [showToast, setShowToast] = useState(false);

    const accountData = {
        groom: {
            title: "신랑측 계좌번호",
            color: "#777",
            accounts: [
                { relation: "신랑", name: "배준식", bank: "경남은행", number: "540-21-0820058" },
                { relation: "아버지", name: "배연도", bank: "국민은행", number: "419825-91-122484" },
                { relation: "어머니", name: "이금자", bank: "국민은행", number: "811-24-0104-071" },
            ]
        },
        bride: {
            title: "신부측 계좌번호",
            color: "#777",
            accounts: [
                { relation: "신부", name: "이은진", bank: "신한은행", number: "110-423-553456" },
                { relation: "아버지", name: "이상정", bank: "신한은행", number: "305-04-056583" },
                { relation: "어머니", name: "김영숙", bank: "우리은행", number: "307-08-261562" },
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
        <div style={mainContainerStyle}>
            <div style={titleContainerStyle}>
                <div style={titleStyle}>Account</div>
                <div style={verticalLineStyle}></div>
            </div>

            <div style={introTextStyle}>
                참석이 어려우신 분들을 위해<br />
                마음을 전할 수 있는 곳을 안내해 드립니다.<br />
                축복해 주셔서 감사합니다.
            </div>

            {/* 복사 알림 토스트 */}
            <div style={{
                ...toastStyle,
                opacity: showToast ? 1 : 0,
                transform: `translateX(-50%) translateY(${showToast ? '0' : '20px'})`,
                visibility: showToast ? 'visible' : 'hidden'
            }}>
                계좌번호가 복사되었습니다.
            </div>

            {/* 계좌 아코디언 영역 */}
            <div style={accordionGroupStyle}>
                {Object.entries(accountData).map(([key, side]) => (
                    <div key={key} style={containerStyle}>
                        <button
                            onClick={() => setOpenSide(openSide === key ? null : key)}
                            style={headerStyle}
                        >
                            <span style={headerTitleStyle}>{side.title}</span>
                            <span style={{
                                transition: 'transform 0.3s',
                                transform: openSide === key ? 'rotate(180deg)' : 'rotate(0deg)',
                                fontSize: '0.8rem', color: side.color
                            }}>▼</span>
                        </button>

                        <div style={{
                            maxHeight: openSide === key ? '350px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            backgroundColor: '#fdfdfd'
                        }}>
                            <div style={{ padding: '10px 20px 20px' }}>
                                {side.accounts.map((acc, idx) => (
                                    <div key={idx} style={accountRowStyle}>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={relationNameStyle}>{acc.relation} <strong style={{ color: '#1a1a1a' }}>{acc.name}</strong></div>
                                            <div style={bankNumberStyle}>{acc.bank} {acc.number}</div>
                                        </div>
                                        <button onClick={() => handleCopy(acc.number)} style={copyBtnStyle}>복사</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 하단 성당 공지: Notice 박스 형태로 분리 */}
            <div style={noticeBoxStyle}>
                <div style={noticeTitleStyle}>💐 축하 화환 관련 안내</div>
                <p style={noticeDescStyle}>
                    성당 예식 특성상 <strong>화환, 꽃바구니, 화분은 정중히 사절합니다.</strong> 대신 어려운 이웃을 위한 <strong>헌금 기부</strong>로 따뜻한 마음을 나누어 주시면 감사하겠습니다.
                </p>
                <ul style={noticeDescStyle}>
                    <li>① 기부하신 분의 성함을 리본으로 제작하여 성전 로비에 진열해 드립니다.</li>
                    <li>② 혼주님께 기부 내역을 전달해 드리며, 주보에 신랑, 신부의 성함을 게재해 드립니다.</li>
                </ul>
                <p style={noticeDescStyle}>
                    신청: 본당 사무실 (T. 02-516-5066)
                </p>
            </div>
        </div>
    );
};


const containerStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    overflow: 'hidden',
};

const headerStyle = {
    width: '100%',
    padding: '12px 20px',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none'
};

const titleContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
}

const titleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#16589A',
    marginBottom: '10px',
    letterSpacing: '2px'
};

const verticalLineStyle = {
    marginTop: '10px',
    marginBottom: '20px',
    width: '30px',
    height: '1px',
    backgroundColor: "#ddd"
};

const accountRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #fcfcfc'
};

const copyBtnStyle = {
    padding: '6px 10px',
    fontSize: '0.8rem',
    backgroundColor: '#f8f8f8',
    color: '#444',
    border: '1px solid #eee',
    borderRadius: '4px',
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

const mainContainerStyle = {
    margin: '60px auto',
    padding: '0 20px',
    maxWidth: '480px'
};

const introTextStyle = {
    fontSize: '1rem',
    color: '#000',
    lineHeight: '2',
    marginTop: "10px",
    marginBottom: '35px',
    wordBreak: 'keep-all'
};

const accordionGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '30px' // 하단 공지사항과 간격 벌리기
};

const headerTitleStyle = {
    fontSize: '1rem',
    color: '#333',
    fontWeight: '500'
};

const relationNameStyle = {
    fontSize: '0.95rem',
    color: '#666'
};

const bankNumberStyle = {
    fontSize: '0.95rem',
    color: '#333',
    marginTop: '4px',
    letterSpacing: '0.5px'
};

/* --- 하단 공지사항 박스 스타일 --- */
const noticeBoxStyle = {
    backgroundColor: '#f9f9f9',
    padding: '12px 20px',
    borderRadius: '8px',
    textAlign: 'left',
    border: '1px solid #eee'
};

const noticeTitleStyle = {
    margin: '12px 0',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#16589A',
};

const noticeDescStyle = {
    fontSize: '1rem',
    color: '#333',
    lineHeight: '1.6',
    margin: '12px 0',
    wordBreak: 'keep-all'
};


export default Account;