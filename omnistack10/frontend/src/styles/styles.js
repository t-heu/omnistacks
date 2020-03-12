import styled from 'styled-components';

export const MainStyled = styled.main`
  flex: 1;
  width: 100%;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    list-style: none;
  }

  @media(max-width: 650px) {
    ul {
      grid-template-columns: 1fr;
    }
  }

  li.dev-item {
    background: ${props => props.theme.back};
    border: solid 1px ${props => props.theme.foreground};
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
    border-radius: 2px;
    padding: 20px;
  }
  
  li.dev-item header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  li.dev-item header img {
    width: 54px;
    height: 54px;
    border-radius: 50%;
  }
  
  li.dev-item header .user-info {
    margin-left: 10px;
  }
  
  .user-info strong {
    display: block;
    font-size: 16px;
    color: ${props => props.theme.color};
  }
  
  .user-info {
    font-size: 13px;
    color: #999;
    margin-top: 2px;
  }
  
  li.dev-item p {
    color: ${props => props.theme.paragraph};
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0;
  }
  
  li.dev-item a {
    color: #8e4dff;
    font-size: 14px;
    text-decoration: none;
  }
  
  li.dev-item a:hover {
    color: #5a2ea6;
  };
`

export const SidebarStyle = styled.aside`
    width: 320px;
    background: ${props => props.theme.back};
    border: solid 1px ${props => props.theme.foreground};
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
    border-radius: 2px;
    padding: 30px 20px;
  
  strong {
    font-size: 20px;
    text-align: center;
    display: block;
    color: ${props => props.theme.color};
  }
  
  .link {
    display: block;
    font-size: 14px;
    color: ${props => props.theme.color};
    padding-top: 25px;
    cursor: pointer;
    text-align: center;
  }
  
  form {
    margin-top: 30px;
  }
  
  form .input-block + .input-block {
    margin-top: 20px;
  }
  
  form .input-group {
    margin-top: 20px;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
  
  form .input-group .input-block {
    margin-top: 0;
  }
  
  form .input-block label {
    color: #acacac;
    font-size: 14px;
    font-weight: bold;
    display: block;
  }
  
  form .input-block input {
    width: 100%;
    height: 32px;
    font-size: 14px;
    color: #666;
    border: 0;
    background: none;
    border-bottom: 1px solid #eee;
  }
  
  form button[type=submit] {
    width: 100%;
    border: 0;
    margin-top: 30px;
    background: #7d40e7;
    border-radius: 2px;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: background 0.5s;
  }
  
  form button[type=submit]: hover {
    background: #6931ca;
  }
`
