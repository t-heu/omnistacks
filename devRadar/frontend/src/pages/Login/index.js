import React, { useState } from 'react'

import api from '../../services/api'

import { ThemeContext } from '../../context'
import { SidebarStyle } from '../../styles/styles'

export default function Login({history}) {
  const [github_username, setGithubUsername] = useState('')
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    
    await api.get(`/dev/${github_username}`)
    
    localStorage.setItem('@keyUser', github_username)
    
    history.push('/profile')
  }
  
  return (
    <div className="app">
    <ThemeContext.Consumer>
      {theme => (
      <SidebarStyle theme={theme}>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="username_github">Usuário do github</label>
            <input 
              name="github_username" 
              id="username_github" 
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>
          
          <button type="submit">{loading ? 'loading...' : 'Entrar'}</button>
        </form>
      </SidebarStyle>
      )}
      </ThemeContext.Consumer>
    </div>
  )
}