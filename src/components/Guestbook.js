import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, deleteDoc } from "firebase/firestore";

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const isDev = process.env.NODE_ENV === 'development';
    const colRef = collection(db, isDev ? "guestbook_dev" : "guestbook");

    useEffect(() => {
        const q = query(colRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !text) {
            alert("이름과 메시지를 입력해주세요!");
            return;
        }

        await addDoc(colRef, {
            name,
            text,
            password: password || null, // 비밀번호가 없으면 null로 저장
            isPrivate,
            createdAt: serverTimestamp()
        });

        setName(''); setText(''); setPassword(''); setIsPrivate(false);
    };

    const handleDelete = async (id, savedPassword) => {
        // 1. 애초에 비밀번호 없이 작성된 글인 경우
        if (!savedPassword) {
            alert("이 글은 비밀번호 없이 작성되어 직접 삭제할 수 없습니다. 관리자에게 문의하세요.");
            return;
        }

        // 2. 비밀번호가 있는 경우 확인 절차
        const inputPassword = prompt("삭제를 원하시면 비밀번호를 입력해주세요.");

        if (inputPassword === savedPassword) {
            if (window.confirm("정말 삭제하시겠습니까?")) {
                await deleteDoc(doc(db, isDev ? "guestbook_dev" : "guestbook", id));
                alert("삭제되었습니다.");
            }
        } else if (inputPassword !== null) {
            alert("비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <div style={{ margin: '40px auto', padding: '0 20px' }}>
            <h4>Guestbook</h4>

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        value={name} onChange={e => setName(e.target.value)}
                        placeholder="이름" style={{ ...inputStyle, flex: 2 }}
                    />
                    <input
                        type="password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="비밀번호(선택)" style={{ ...inputStyle, flex: 1.5 }}
                    />
                </div>
                <textarea
                    value={text} onChange={e => setText(e.target.value)}
                    placeholder="축하 메시지를 남겨주세요" style={{ ...inputStyle, height: '80px' }}
                />

                <div style={toggleContainerStyle}>
                    <label style={{ fontSize: '0.8rem', cursor: 'pointer', color: '#888' }}>
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            style={{ marginRight: '5px' }}
                        />
                        비밀글로 남기기
                    </label>
                </div>

                <button type="submit" style={submitStyle}>방명록 남기기</button>
            </form>

            <div style={{ textAlign: 'left', marginTop: '30px' }}>
                {messages.map(m => (
                    <div key={m.id} style={messageBoxStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong>{m.name}</strong>
                                {m.isPrivate && <span style={{ fontSize: '0.75rem', color: '#ff4d4d', marginLeft: '8px' }}>🔒 비밀글</span>}
                            </div>

                            {/* 비밀번호가 있는 글에만 삭제 버튼을 노출합니다 */}
                            {m.password && (
                                <button
                                    onClick={() => handleDelete(m.id, m.password)}
                                    style={deleteBtnStyle}
                                >
                                    삭제
                                </button>
                            )}
                        </div>

                        <p style={{ marginTop: '8px', color: m.isPrivate ? '#aaa' : '#333', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            {m.isPrivate ? "비밀글입니다. 신랑·신부님만 읽을 수 있습니다." : m.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '15px',
    backgroundColor: '#fdfdfd',
    border: '1px solid #eee',
    borderRadius: '12px',
    boxSizing: 'border-box', // 박스 크기 계산 방식 고정
    width: '100%'
};

const inputStyle = {
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.9rem',
    minWidth: '0',
    width: '100%'
};

const toggleContainerStyle = {
    textAlign: 'left',
    padding: '2px 0'
};

const submitStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxSizing: 'border-box'
};

const messageBoxStyle = {
    borderBottom: '1px solid #f0f0f0',
    padding: '15px 0',
    wordBreak: 'break-all'
};

const deleteBtnStyle = {
    background: 'none',
    border: 'none',
    color: '#ddd',
    cursor: 'pointer',
    fontSize: '0.7rem',
    textDecoration: 'underline',
    flexShrink: 0
};

export default Guestbook;