import React from 'react'

// se não tiver valor no provider ele assume valor daqui
export const themes = {
  light: {
    foreground: '#fff',
    background: '#e5e6f0',
    color: '#333',
    back: '#fff',
    paragraph: '#666'
  },
  dark: {
    foreground: '#7d40e7',
    background: '#222222',
    color: '#fff',
    back: 'none',
    paragraph: '#fff'
  },
};
/*
body
theme == 'light' ? '#e5e6f0' : '#222222'
border
theme == 'light' ? '#fff' : '#7d40e7' *
  */

export const ThemeContext = React.createContext(
  themes.dark // default value
);

export const pro = React.createContext(
  themes.dark
);