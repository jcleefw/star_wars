import styled from 'styled-components'
import { COLORS, FONT_SIZE } from '../constants'

interface ItemRowProp {
  isTotalRow?: boolean
}

export const Item = styled('tr')<ItemRowProp>`
  border-bottom: 1px solid ${COLORS.gold};
  background: ${COLORS.shuffleGray};
  padding: 1rem;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.isTotalRow &&
    `
    ${FONT_SIZE.sm};
    color: tomato;
  `}

  &:last-child {
    border-bottom: none;
  }
`

const Title = styled.h2`
  ${FONT_SIZE.lg};
  color: ${COLORS.gold};
  margin: 0;
`

const ReleaseDates = styled.span`
  ${FONT_SIZE.sm};
  color: ${COLORS.textGray};
  font-style: italic;
`

const Column = styled('td')<{ justify?: string; direction?: string }>`
  color: inherit;
  display: flex;
  flex-direction: ${(props) => props.direction || 'column'};
  align-items: ${(props) => props.justify || 'start'};
`

const Button = styled('button')`
  background: ${COLORS.gold};
  border: none;
  padding: 3px 8px;
  text-transform: uppercase;
  ${FONT_SIZE.xs};
  font-weight: bold;
  border-radius: 2px;
  outline: none;
`

const VoteCount = styled.div`
  margin-right: 1rem;
`

const Icon = styled.i`
  padding-right: 0.5rem;
`

interface Props {
  index: number
  title: string
  releaseDate: string
  isTotalRow?: boolean
  handleVoteButtonClick: (index: number) => void
  votes: number[]
}

const ListItem = ({
  index,
  title,
  releaseDate,
  handleVoteButtonClick,
  votes,
}: Props) => {
  return (
    <Item>
      <Column>
        <Title>{title}</Title>
        <ReleaseDates>Movie released on {releaseDate}</ReleaseDates>
      </Column>
      <Column justify={'center'} direction="row">
        <VoteCount data-testid="vote-count">
          {votes && votes[index] ? votes[index] : 0}
        </VoteCount>
        <Button onClick={() => handleVoteButtonClick(index)}>
          <Icon className="far fa-thumbs-up"></Icon>Vote
        </Button>
      </Column>
    </Item>
  )
}

export default ListItem
