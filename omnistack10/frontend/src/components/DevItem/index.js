import React from 'react'

export default function DevItem({ dev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          {typeof dev.techs == 'object' ?  (
            <span>{dev.techs.join(', ')}</span>
          ) : (
            <span>{dev.techs}</span>
          )}
        </div>
      </header>
      
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`} >Acessar perfil no github</a>
    </li>
  )
}