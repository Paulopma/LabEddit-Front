import React from 'react';
import LoginPage from './Components/LoginPage';
import styled from 'styled-components';
import RegisterPage from './Components/RegisterPage';
import Router from './router'

const AppContainer = styled.div`
  display: flex;
  align-items:center ;
  flex-direction: column ;
  padding: 10px;
`;

function App() {
  return (
    <AppContainer >
      <Router />
    </AppContainer>
  );
}

export default App;
