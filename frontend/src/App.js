import React from 'react';
import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';

import { ClientProvider } from './contexts/ClientContext';
import Router from './router';

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
  }
`;

function App() {
  return (
    <ClientProvider>
      <GlobalStyle />
      <Router />
    </ClientProvider>
  );
}

export default App;
