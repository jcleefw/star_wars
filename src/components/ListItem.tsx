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
  title: string
  releaseDate: Date
  isTotalRow?: boolean
}

const ListItem = ({ title, releaseDate, isTotalRow = false }: Props) => {
  const [voteCount, setVoteCount] = React.useState(0)
  return (
    <Item isTotalRow={isTotalRow}>
      <Column>
        <Title>{title}</Title>
        <ReleaseDates>Movie released on {releaseDate}</ReleaseDates>
      </Column>
      <Column>
        <div>{voteCount}</div>
        <button onClick={() => setVoteCount(voteCount + 1)}>Vote</button>
      </Column>
    </Item>
  )
}

export default ListItem
