import React from 'react'
import styled from 'styled-components'
import { COLORS, FONT_SIZE } from '../constants'

interface ItemRowProp {
  isTotalRow: boolean
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

const Column = styled.td`
  color: inherit;
`

interface Props {
  index: string | number
  title: string
  releaseDate: Date
  isTotalRow?: boolean
  handleVoteButtonClick: (index: string | number) => void
  votes: number[]
}

const ListItem = ({
  index,
  title,
  releaseDate,
  isTotalRow = false,
  handleVoteButtonClick,
  votes,
}: Props) => {
  return (
    <Item isTotalRow={isTotalRow}>
      <Column>
        <Title>{title}</Title>
        <ReleaseDates>Movie released on {releaseDate}</ReleaseDates>
      </Column>
      <Column>
        <div>
          {votes && votes[index as number] ? votes[index as number] : 0}
        </div>
        <button onClick={() => handleVoteButtonClick(index)}>Vote</button>
      </Column>
    </Item>
  )
}

export default ListItem
