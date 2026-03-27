// src/App.js
import React from 'react';
import './App.css';
import LikeButton from './components/LikeButton';
import Guestbook from './components/Guestbook';
import DDay from './components/DDay';
import Contact from './components/Contact';
import Account from './components/Account';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <div className="container">
        {/* 헤더 섹션 */}
        <header style={{
          marginTop: '120px',
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '300', letterSpacing: '3px', margin: 0 }}>
            <div style={{ padding: '5px 10px' }}>BAE JUNSIK</div>
            <div style={{ fontSize: '1.2rem', color: '#777' }}>&</div>
            <div style={{ padding: '5px 10px' }}>LEE EUNJIN</div>
          </h1>

          <div style={{
            marginTop: '30px',
            marginBottom: '30px',
            width: '1px',
            height: '60px',
            backgroundColor: "#ddd",
            marginRight: 'auto',
            marginLeft: 'auto'
          }}></div>

          <p style={{ color: '#444', marginTop: '10px', fontSize: '1rem', letterSpacing: '1px' }}>
            2026년 08월 22일 토요일 <b>오후 12:00</b>
          </p>
          <p style={{ color: '#444', marginTop: '5px', fontSize: '1rem', fontWeight: '400' }}>
            논현2동 성당
          </p>
          <img
            src={process.env.PUBLIC_URL + "/images/church.png"}
            alt="church image"
            style={{
              marginTop: '30px',
              width: '100%',
              maxWidth: '350px',
              height: 'auto',
              borderRadius: '12px'
            }}
          />
        </header>

        {/* 1. 디데이 */}
        <section>
          <DDay />
        </section>

        {/* 2. 갤러리 */}
        <section>
          <Gallery />
        </section>

        {/* 3. 좋아요 버튼 */}
        <section>
          <LikeButton />
        </section>

        {/* 4. 연락처 */}
        <section>
          <Contact />
        </section>

        {/* 5. 계좌 정보 */}
        <section>
          <Account />
        </section>

        {/* 6. 방명록 */}
        <section>
          <Guestbook />
        </section>

        {/* 푸터 */}
        <footer style={{ padding: '60px 0', color: '#ccc', fontSize: '0.8rem' }}>
          <p>© 2026 Eunjin Lee. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;