import React, { createContext } from 'react'
import styled from 'styled-components'
import { COLORS, FONT_SIZE } from './constants'
import { Container } from './components'
import Listing from './components/Listing'
import Provider from './components/Provider'

const AppContainer = styled.div`
  background-color: ${COLORS.charcoalBlack};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`

const Header = styled.h2`
  ${FONT_SIZE['2xl']}
  margin-top: 3rem;
`

const App = () => {
  return (
    <Provider>
      <AppContainer>
        <Header className="App-header">Star wars Movies db</Header>
        <Container>
          <Listing />
        </Container>
      </AppContainer>
    </Provider>
  )
}

export default App
