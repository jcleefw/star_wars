import React, { useReducer } from 'react';
import styled from 'styled-components'
import { FONT_SIZE } from './constants';
import {Container} from './components';
import { fetchData } from './utils/api';

const AppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Header = styled.h2`${FONT_SIZE['2xl']}`

function App() {

  return (
    <AppContainer>
      <Header className="App-header">
        Star wars Movies db
      </Header>
      <Container>boo</Container>
    </AppContainer>
  );
}

export default App;
