import React from 'react';
import './App.css';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Invitation from './components/Invitation';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Account from './components/Account';
import Guestbook from './components/Guestbook';

import Footer from './components/Footer';
import ComponentDivider from './components/ComponentDivider';

function App() {
  return (
    <div className="App">
      <ScrollProgress />
      <div className="container">
        <Header />

        <ComponentDivider />

        <Invitation />
        <ComponentDivider />

        <Gallery />
        <ComponentDivider />

        <Location />
        <ComponentDivider />

        <Account />
        <ComponentDivider />

        <Guestbook />

        <Footer />
      </div>
    </div>
  );
}

export default App;