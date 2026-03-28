import React from 'react';
import './App.css';
import Header from './components/Header'; // 방금 만든 헤더 가져오기
import DDay from './components/DDay';
import Invitation from './components/Invitation';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Account from './components/Account';
import Guestbook from './components/Guestbook';
import LikeButton from './components/LikeButton';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <DDay />
        <Invitation />
        <Gallery />
        <Location />
        <Account />
        <Guestbook />
        <LikeButton />
        <Footer />
      </div>
    </div>
  );
}

export default App;