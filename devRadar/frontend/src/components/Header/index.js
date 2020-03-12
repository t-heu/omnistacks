import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

export default function Header({ onClick }) {
  return (
    <header className="navbar">
      <Link to="/">
        <h2>logo</h2>
      </Link>
      
      <button onClick={() => onClick()} type="button">change theme</button>
    </header>
  )
}