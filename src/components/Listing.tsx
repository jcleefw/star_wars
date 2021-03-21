import React, { FC, useEffect, useReducer } from 'react'
import { fetchData, fetchResponse } from '../utils/api'
import ListItem, { Item } from './ListItem'
import styled from 'styled-components'

interface Props {}

const initialState: {
  loading: boolean
  // TODO: update data with result  & errors types
  data: { count: number | null; results: { [x: string]: any; errors: any } }[] | null
} = {
  loading: false,
  data: [],
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return (state = action.payload)
    default:
      return state
  }
}

const generateList = (data: { [x: string]: any }[]) => {
  const sortedData = data.sort((a, b) => {
    const aDate = new Date(a.release_date).getTime()
    const bDate = new Date(b.release_date).getTime()
    if (aDate < bDate) {
      return -1
    }
    if (aDate > bDate) {
      return 1
    }

    return 0
  })

  return sortedData.map((item: any, index: number) => {
    return <ListItem key={index} title={item.title} releaseDate={item.release_date} />
  })
}

const Table = styled.table`
  width: 100%;
`

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
    <>
      {state.errors && <div>{state.data.errors.toString()}</div>}
      {state.loading && <div>Loading...</div>}

      {state.data?.count && (
        <Table>
          <tbody>
            {generateList(state.data.results)}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default Listing
