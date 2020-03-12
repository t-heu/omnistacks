import React, { useState, useEffect } from 'react'

import api from '../../services/api'
import DevItem from '../../components/DevItem'
import DevForm from '../../components/DevForm'

import { ThemeContext }  from '../../context'
import { MainStyled, SidebarStyle } from '../../styles/styles'

export default function Main({history}) {
  const [devs, setDevs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      
      setDevs(response.data)
      setLoading(false)
    }
    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    
    setDevs([...devs, response.data])
  }
  
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div className="app">
          <SidebarStyle theme={theme}>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handleAddDev} />
            <a href className="link" onClick={() => history.push('/login')}>login</a>
          </SidebarStyle>
          
          <MainStyled theme={theme}>
            <ul>
              {loading ? (
                <h3>loading...</h3>
              ) : (
                <>
                  {devs.map(dev => (
                    <DevItem key={dev._id} dev={dev} />
                  ))}
                </>
              )}
            </ul>
          </MainStyled>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}