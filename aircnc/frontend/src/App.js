import React, { useState } from 'react';

import './App.css'
import logo from './assets/logo.svg'
import Routes from './routes'

function App() {
  const th = localStorage.getItem('theme')
  const [theme, setTheme] = useState(th === null ? 'content' : th)

  function changeTheme() {
    const vt = theme === 'content' ? 'dark' : 'content'
    localStorage.setItem('theme', vt)
    setTheme(vt)
  }

  return (                        
    <div className="container">
      <img src={logo} alt="logo" />
      <div className={theme}>
        <button onClick={changeTheme}className="btn-theme">🌓</button>
        <Routes />
      </div>
    </div>              
  );
}

export default App;
