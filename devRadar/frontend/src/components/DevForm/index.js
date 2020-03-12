import React, { useState, useEffect } from 'react'

import Geo from '../../utils/Geo'

export default function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState('')
  const [techs, setTechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [loading, setLoading] = useState(false)

    useEffect(() => {
      const { latitude, longitude } = Geo
      setLatitude(latitude)
      setLongitude(longitude)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    })
    
    setGithubUsername('')
    setTechs('')
    setLoading(false)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="username_github">Usuário do github</label>
        <input 
          name="github_username" 
          id="username_github" 
          required 
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
        />
      </div>
      
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label> 
        <input 
          name="techs" 
          id="techs" 
          required 
          value={techs} 
          onChange={e => setTechs(e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <div className="input-block">  
          <label htmlFor="latitude">Latitude</label>
          <input 
            type="number" 
            name="latitude" 
            id="latitude" 
            required 
            value={latitude} 
            onChange={e => setLatitude(e.target.value)}
          />
        </div>
        
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label> 
          <input 
            type="number" 
            name="longitude" 
            id="longitude" 
            required 
            value={longitude} 
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      
      <button type="submit">{ loading ? 'loading...' : 'Salvar' }</button>
    </form>
  )
}
