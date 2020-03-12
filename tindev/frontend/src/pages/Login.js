import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import './Login.css'
import io from 'socket.io-client'
import api from '../services/api'

export default function Login({ history }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    const socket = io('http://localhost:3333')
    
    socket.on('notExist', ee => {
      setError(ee.msg)
    })

    const response = await api.post('/devs', { username })
    
    const { _id } = response.data

    history.push(`/dev/${_id}`)
  }

  return (
    <div className="login-container">
      { error && (
        <div className="error">
          <button onClick={() => setError(null)}>×</button>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="tindev" />
        <input 
          placeholder="Digite seu usuário do Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
