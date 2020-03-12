import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }
  
  body {
    background-color: ${props => props.theme.background};
    -webkit-font-smoothing: antialiased;
  }
  
  body, button, input {
    font-family: 'Roboto', sans-serif;
  }
  
  .app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  
  .app main {
    margin-left: 30px;
  }
  
  @media(max-width: 1000px) {
    .app {
      flex-direction: column;
    }
  
    .app main {
      margin-left: 0;
      margin-top: 20px;
    }
    
    .app aside {
      width: 100%;
    }
  }
`