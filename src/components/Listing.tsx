import React, { FC, useEffect, useReducer } from 'react'
import { fetchData, fetchResponse } from '../utils/api'
import styled from 'styled-components'
import { COLORS, FONT_SIZE } from '../constants'

interface Props {}

const initialState: {
  loading: boolean
  // TODO: update data with result  & errors types
  data: { count: number | null; results: { [x: string]: any; errors: any } }[] | null
} = {
  loading: false,
  data: [],
}

const ListItem = styled.div`
  margin-bottom: 1rem;
  background: ${COLORS.shuffleGray};
  padding: 1.5rem;
  border-radius: 3px;
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

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return (state = action.payload)
    default:
      return state
  }
}

const generateList = (data: { [x: string]: any }[]) => {
  return data.map((item: any, index: number) => {
    return (
      <ListItem key={index}>
        <Title>{item.title}</Title>
        <ReleaseDates>Movie released on {item.release_date}</ReleaseDates>
      </ListItem>
    )
  })
}

const Listing: FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!state.loading && state.data?.length === 0) {
      dispatch({ type: 'FETCH_DATA', payload: { loading: true } })
    }

    if (state.loading && !state.data) {
      fetchData('films').then((data: fetchResponse) => {
        dispatch({ type: 'FETCH_DATA', payload: data.payload })
      })
    }
  }, [state])

  return (
    <div>
      {state.errors && <div>{state.data.errors.toString()}</div>}
      {state.loading && <div>Loading...</div>}
      {state.data?.count && generateList(state.data.results)}
    </div>
  )
}

export default Listing
