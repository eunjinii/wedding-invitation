import React, { useState } from 'react';

const Contact = () => {
    const [isOpen, setIsOpen] = useState(false);

    const groomSide = [
        { role: '신랑', name: '배준식', phone: '010-9119-9596' },
        { role: '신랑 아버지', name: '배연도', phone: '010-0000-0000' },
        { role: '신랑 어머니', name: '이금자', phone: '010-0000-0000' },
    ];

    const brideSide = [
        { role: '신부', name: '이은진', phone: '010-5415-1172' },
        { role: '신부 아버지', name: '이상정', phone: '010-0000-0000' },
        { role: '신부 어머니', name: '김영숙', phone: '010-0000-0000' },
    ];

    const ContactRow = ({ person }) => (
        <div style={rowStyle}>
            <div style={roleNameStyle}>
                <span style={roleStyle}>{person.role}</span>
                <span style={nameStyle}>{person.name}</span>
            </div>
            <div style={iconGroupStyle}>
                <a href={`tel:${person.phone}`} style={iconLinkStyle}>📞</a>
                <a href={`sms:${person.phone}`} style={iconLinkStyle}>✉️</a>
            </div>
        </div>
    );

    return (
        <div style={containerStyle}>
            {/* 메인 버튼 */}
            <button onClick={() => setIsOpen(true)} style={mainBtnStyle}>
                연락하기
            </button>

            {/* 모달 오버레이 */}
            {isOpen && (
                <div style={overlayStyle} onClick={() => setIsOpen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsOpen(false)} style={closeXStyle}>✕</button>

                        <div style={modalHeaderStyle}>
                            <h3 style={modalTitleStyle}>축하 인사 전하기</h3>
                            <p style={modalSubTitleStyle}>전화, 문자메시지로 축하 인사를 전해보세요.</p>
                        </div>

                        <div style={dividerStyle}></div>

                        {/* 신랑측 */}
                        <div style={sectionStyle}>
                            {groomSide.map((p, i) => <ContactRow key={i} person={p} />)}
                        </div>

                        <div style={{ ...dividerStyle, margin: '15px 0' }}></div>

                        {/* 신부측 */}
                        <div style={sectionStyle}>
                            {brideSide.map((p, i) => <ContactRow key={i} person={p} />)}
                        </div>

                        <button onClick={() => setIsOpen(false)} style={bottomCloseBtnStyle}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 스타일 객체 모음 ---

const containerStyle = { margin: '40px 0', textAlign: 'center' };

const mainBtnStyle = {
    padding: '12px 60px',
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '30px',
    fontSize: '0.95rem',
    color: '#333',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    letterSpacing: '1px'
};

const overlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000,
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
};

const modalStyle = {
    backgroundColor: '#fff', width: '100%', maxWidth: '350px',
    borderRadius: '15px', position: 'relative', overflow: 'hidden',
    animation: 'modalShow 0.3s ease-out'
};

const closeXStyle = {
    position: 'absolute', top: '15px', right: '15px',
    background: 'none', border: 'none', fontSize: '1.2rem', color: '#ccc', cursor: 'pointer'
};

const modalHeaderStyle = { padding: '40px 20px 20px' };

const modalTitleStyle = {
    fontSize: '1.3rem', color: '#ff4d4d', fontWeight: '400', marginBottom: '8px'
};

const modalSubTitleStyle = { fontSize: '0.85rem', color: '#888' };

const dividerStyle = { height: '1px', backgroundColor: '#eee', margin: '0 20px' };

const sectionStyle = { padding: '20px' };

const rowStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'
};

const roleNameStyle = { display: 'flex', gap: '20px', alignItems: 'center' };

const roleStyle = { fontSize: '0.85rem', color: '#888', width: '70px', textAlign: 'left' };

const nameStyle = { fontSize: '1rem', color: '#333', fontWeight: '500' };

const iconGroupStyle = { display: 'flex', gap: '15px' };

const iconLinkStyle = { textDecoration: 'none', fontSize: '1.1rem', color: '#666' };

const bottomCloseBtnStyle = {
    width: '100%', padding: '15px', border: 'none', borderTop: '1px solid #eee',
    backgroundColor: '#f9f9f9', color: '#666', fontSize: '0.95rem', cursor: 'pointer'
};

export default Contact;