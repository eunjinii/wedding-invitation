import React from 'react';

const Contact = () => {
    const contacts = [
        { role: '신랑', name: '배준식', phone: '010-9119-9596' },
        { role: '신부', name: '이은진', phone: '010-5415-1172' }
    ];

    return (
        <div style={{ margin: '40px 0', padding: '20px' }}>
            <h4 style={{ marginBottom: '20px' }}>Contact</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {contacts.map((person) => (
                    <div key={person.role} style={cardStyle}>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{person.role}</span>
                        <div style={{ fontWeight: 'bold', margin: '5px 0' }}>{person.name}</div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <a href={`tel:${person.phone}`} style={iconBtnStyle}>📞</a>
                            <a href={`sms:${person.phone}`} style={iconBtnStyle}>💬</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    width: '120px'
};

const iconBtnStyle = {
    textDecoration: 'none',
    fontSize: '1.2rem',
    backgroundColor: '#f5f5f5',
    padding: '8px',
    borderRadius: '50%',
    flex: 1,
    textAlign: 'center'
};

export default Contact;