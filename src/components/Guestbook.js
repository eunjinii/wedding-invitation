import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, deleteDoc } from "firebase/firestore";

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const pageLimit = 5;

    const isDev = process.env.NODE_ENV === 'development';
    const colRef = collection(db, isDev ? "guestbook_dev" : "guestbook");

    useEffect(() => {
        const q = query(colRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = messages.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(messages.length / postsPerPage);

    const currentGroup = Math.ceil(currentPage / pageLimit);
    const lastPageInGroup = currentGroup * pageLimit;
    const firstPageInGroup = lastPageInGroup - pageLimit + 1;
    const actualLastPage = Math.min(lastPageInGroup, totalPages);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !text) { alert("이름과 메시지를 입력해주세요!"); return; }
        await addDoc(colRef, {
            name, text, password: password || null, isPrivate, createdAt: serverTimestamp()
        });
        setName(''); setText(''); setPassword(''); setIsPrivate(false);
        setCurrentPage(1);
    };

    const handleDelete = async (id, savedPassword) => {
        if (!savedPassword) { alert("비밀번호가 없는 글은 관리자에게 문의하세요."); return; }
        const inputPassword = prompt("삭제 비밀번호를 입력해주세요.");
        if (inputPassword === savedPassword) {
            if (window.confirm("정말 삭제하시겠습니까?")) {
                await deleteDoc(doc(db, isDev ? "guestbook_dev" : "guestbook", id));
            }
        } else if (inputPassword !== null) { alert("비밀번호 불일치!"); }
    };

    return (
        <div style={containerStyle}>
            <div style={titleContainerStyle}>
                <div style={titleStyle}>Guestbook</div>
                <div style={verticalLineStyle}></div>
            </div>

            <div style={listContainerStyle}>
                {currentPosts.map(m => (
                    <div key={m.id} style={messageBoxStyle}>
                        <div style={messageHeaderStyle}>
                            <div>
                                <strong>{m.name}</strong>
                                {m.isPrivate && <span style={privateBadgeStyle}>🔒 비밀글</span>}
                            </div>
                            {m.password && (
                                <button onClick={() => handleDelete(m.id, m.password)} style={deleteBtnStyle}>
                                    삭제
                                </button>
                            )}
                        </div>
                        <p style={{ ...messageTextStyle, color: m.isPrivate ? '#aaa' : '#333' }}>
                            {m.isPrivate ? "비밀글입니다. 신랑·신부님만 읽을 수 있습니다." : m.text}
                        </p>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div style={paginationWrapper}>
                    <button
                        disabled={currentGroup === 1}
                        onClick={() => paginate(firstPageInGroup - 1)}
                        style={pageArrowStyle}
                    > &lt; </button>

                    {Array.from({ length: actualLastPage - firstPageInGroup + 1 }, (_, i) => firstPageInGroup + i).map(num => (
                        <button
                            key={num}
                            onClick={() => paginate(num)}
                            style={{
                                ...pageNumberStyle,
                                color: currentPage === num ? '#1a1a1a' : '#ccc',
                                fontWeight: currentPage === num ? 'bold' : 'normal'
                            }}
                        > {num} </button>
                    ))}

                    <button
                        disabled={lastPageInGroup >= totalPages}
                        onClick={() => paginate(lastPageInGroup + 1)}
                        style={pageArrowStyle}
                    > &gt; </button>
                </div>
            )}

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputGroupStyle}>
                    <input
                        value={name} onChange={e => setName(e.target.value)}
                        placeholder="이름" style={nameInputStyle}
                    />
                    <input
                        type="password" value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="비밀번호(선택)" style={passwordInputStyle}
                    />
                </div>
                <textarea
                    value={text} onChange={e => setText(e.target.value)}
                    placeholder="축하 메시지를 남겨주세요" style={textareaStyle}
                />
                <div style={toggleContainerStyle}>
                    <label style={labelStyle}>
                        <input
                            type="checkbox" checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            style={checkboxStyle}
                        />
                        비밀글로 남기기
                    </label>
                </div>
                <button type="submit" style={submitStyle}>방명록 남기기</button>
            </form>
        </div>
    );
};

// --- 스타일 객체 모음 ---

const containerStyle = {
    margin: '60px auto',
    padding: '0 20px',
    maxWidth: '480px'
};

const titleContainerStyle = {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
}

const titleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ff4d4d',
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

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    // padding: '15px',
    backgroundColor: '#fdfdfd',
    // border: '1px solid #eee',
    // borderRadius: '12px',
    // boxSizing: 'border-box',
    width: '100%'
};

const inputGroupStyle = {
    display: 'flex',
    gap: '10px'
};

const commonInputStyle = {
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.9rem',
    minWidth: '0',
};

const nameInputStyle = {
    ...commonInputStyle,
    flex: 2,
    width: '100%'
};

const passwordInputStyle = {
    ...commonInputStyle,
    flex: 1.5,
    width: '100%'
};

const textareaStyle = {
    ...commonInputStyle,
    height: '80px',
    width: '100%'
};

const toggleContainerStyle = {
    textAlign: 'left',
    padding: '2px 0'
};

const labelStyle = {
    fontSize: '0.8rem',
    cursor: 'pointer',
    color: '#888'
};

const checkboxStyle = {
    marginLeft: '0px',
    marginRight: '5px'
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

const listContainerStyle = {
    textAlign: 'left',
    marginTop: '30px',
    minHeight: '300px'
};

const messageBoxStyle = {
    borderBottom: '1px solid #f0f0f0',
    padding: '15px 0',
    wordBreak: 'break-all'
};

const messageHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const privateBadgeStyle = {
    fontSize: '0.75rem',
    color: '#ff4d4d',
    marginLeft: '8px'
};

const messageTextStyle = {
    marginTop: '8px',
    marginBottom: '2px',
    fontSize: '0.9rem',
    lineHeight: '1.5'
};

const deleteBtnStyle = {
    background: 'none',
    border: 'none',
    color: '#aaa',
    cursor: 'pointer',
    fontSize: '0.7rem',
    textDecoration: 'underline',
    flexShrink: 0
};

const paginationWrapper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    margin: '20px 0'
};

const pageNumberStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.8rem',
    padding: '4px 8px'
};

const pageArrowStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#888',
    padding: '5px'
};

export default Guestbook;