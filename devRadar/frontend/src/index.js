import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes'

import Global from './styles/global'
import Header from './components/Header'

import { ThemeContext, themes }  from './context'

function App() {
  const [themeDefault, setTheme] = useState(themes.dark)
  
  function changedTheme() {
    setTheme(themeDefault === themes.light ? themes.dark : themes.light)
  }
  
  return (
    <ThemeContext.Provider value={themeDefault}>
      <ThemeContext.Consumer>
        {theme => (
          <BrowserRouter>
            <Global theme={theme} />
            <Header onClick={changedTheme} />
            <Routes />
          </BrowserRouter>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));