import React, { useState, useEffect } from 'react'

import DevItem from '../../components/DevItem'
import api from '../../services/api'

import { ThemeContext } from '../../context'
import { MainStyled, SidebarStyle } from '../../styles/styles'
import Geo from '../../utils/Geo'

export default function Profile() {
  const [dev, setDev] = useState([])
  const [avatar_url, setAvatar_url] = useState('')
  const [name, setName] = useState('')
  const [techs, setTechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    async function load() {
      const github_username = localStorage.getItem('@keyUser');
      
      const response = await api.get(`/dev/${github_username}`);
      
      response.data.techs = response.data.techs.join(', ')
      setDev(response.data)
    }
    load()
  },[])
  
    useEffect(() => {
      const { latitude, longitude } = Geo
      setLatitude(latitude)
      setLongitude(longitude)
  }, [])
  
  async function handleUpdate(e) {
    e.preventDefault()
    setLoading(true)

    const { _id } = dev
    
    await api.put(`/devs/${_id}`, {
      name,
      techs,
      latitude,
      longitude
    })
    
    setName('')
    setTechs('')
    setLoading(false)
  }
  
  async function handleDelete(id) {
    await api.delete(`/devs/${id}`)
  }

  return (
    <div className="app">
      <ThemeContext.Consumer>
        {theme => (
        <>
        <SidebarStyle theme={theme}>
          <form onSubmit={handleUpdate}>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                name="name" 
                id="name" 
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            
            <div className="input-block">
              <label htmlFor="avatar_url">Mudar foto do perfil</label>
              <input 
                name="avatar_url" 
                id="avatar_url" 
                value={avatar_url}
                onChange={e => setAvatar_url(e.target.value)}
              />
            </div>
              
            <div className="input-block">
              <label htmlFor="techs">Tecnologias</label> 
              <input 
                name="techs" 
                id="techs" 
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
                  value={longitude} 
                  onChange={e => setLongitude(e.target.value)}
                />
              </div>
            </div>
            
            <button type="submit">{loading ? 'loading...' : 'Atualizar'}</button>
          </form>
          <a className="link" style={{color: 'red', cursor: 'pointet'}} onClick={() => handleDelete(dev._id)}>delete</a>
        </SidebarStyle>
        
        <MainStyled theme={theme}>
          <ul>
            <DevItem dev={dev} />  
          </ul>
        </MainStyled>
        </>
        )}
      </ThemeContext.Consumer>
    </div>
  )
}

