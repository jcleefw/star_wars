import styled from 'styled-components'
import { COLORS, FONT_SIZE } from './constants'
import { Container } from './components'
import Listing from './components/Listing'

const AppContainer = styled.div`
  background-color: ${COLORS.charcoalBlack};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // font-size: calc(10px + 2vmin);
  color: white;
`

const Header = styled.h2`
  ${FONT_SIZE['2xl']}
`

const App = () => {
  return (
    <AppContainer>
      <Header className="App-header">Star wars Movies db</Header>
      <Container>
        <Listing />
      </Container>
    </AppContainer>
  )
}

export default App
