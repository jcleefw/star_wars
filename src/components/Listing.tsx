import React, { FC, useEffect, useReducer } from 'react'
import { fetchData } from '../utils/api'

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
  return data.map((item: any, index: number) => {
    return (
      <div key={index}>
        {item.title} = {item.release_date}
      </div>
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
      fetchData('films').then((data) => {
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
