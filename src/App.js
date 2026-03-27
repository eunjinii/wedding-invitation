// src/App.js
import React from 'react';
import './App.css'; // CSS 파일 임포트 필수!
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
        <header style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '300', letterSpacing: '3px' }}>
            <div style={{ padding: 10 }}>BAE JUNSIK</div> <div>&</div> <div style={{ padding: 10 }}>LEE EUNJIN</div>
          </h1>
          <p style={{ color: '#888', marginTop: '10px' }}>2026. 08. 22. SAT PM 12:00</p>
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