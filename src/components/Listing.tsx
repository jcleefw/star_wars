import React, { FC, useEffect, useReducer } from 'react'

interface Props {}

const initialState: {
  loading: boolean
  // TODO: update data with result  & errors types
  data: { count: number | null; results: { [x: string]: any } }[] | null
} = {
  loading: false,
  data: [],
}

const reducer = (state: any, action: any) => {
  console.log(action)
  switch (action.type) {
    case 'STORE_DATA':
      console.log('saving...')
      return (state = action.payload)
    case 'FETCH_DATA':
      console.log('fetching...')
      return (state = action.payload)
    default:
      return state
  }
}

const generateList = (data: { [x: string]: any }[]) => {
  console.log('data', data)
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
  const BASE_URL = 'https://swapi.dev/api/'
  const url = 'films'

  const fetchData = async () => {
    return await fetch(`${BASE_URL}${url}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'STORE_DATA', payload: { loading: false, data } })
      })
    // TODO: do catch
  }

  useEffect(() => {
    console.log('useEffect')
    if (!state.loading && state.data.length === 0) {
      dispatch({ type: 'FETCH_DATA', payload: { loading: true } })
    }

    if (state.loading && !state.data) {
      // TODO: use api/utils instead
      fetchData()
    }
  }, [state])
  return <div>{state.data?.count && generateList(state.data.results)}</div>
}

export default Listing
