import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#6200ee',
  surface: '#f5f5f5',
};

export const darkTheme = {
  background: '#121212',
  text: '#e0e0e0',
  primary: '#bb86fc',
  surface: '#1e1e1e',
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    color:      ${({ theme }) => theme.text};
    font-family: sans-serif;
  }
  button {
    font-family: inherit;
  }
`;
