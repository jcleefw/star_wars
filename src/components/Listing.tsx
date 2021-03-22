import { FC, useEffect, useReducer } from 'react'
import {
  fetchData,
  fetchResponse,
  sortDataByDates,
  reducer,
  OrderEnum,
} from '../utils'
import ListItem, { Item } from './ListItem'
import styled from 'styled-components'
import { AnyObject } from '../interface'

interface filmsResults extends AnyObject {
  title: string
  release_date: string
}

export interface State {
  loading: boolean
  data: { count: number | null; results: filmsResults[] } | null
  votes: number[] | null
  errors: any[] | null
}
interface Props {}

const initialState: State = {
  loading: false,
  data: null,
  votes: null,
  errors: null,
}

const sum = (total: number, number: number) => {
  return total + number
}

const Table = styled.table`
  width: 100%;
`

const Listing: FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!state.loading && !state.data && !state.errors) {
      dispatch({ type: 'UPDATE_DATA', payload: { loading: true } })
    }

    if (state.loading && (!state.data || !state.errors)) {
      fetchData('films').then((response: fetchResponse) => {
        let votes = new Array(response.payload.data?.count).fill(0)
        dispatch({
          type: 'UPDATE_DATA',
          payload: { ...response.payload, votes: votes },
        })
      })
    }
  }, [state])

  const handleVoteButtonClick = (index: number | string) => {
    if (Number(index) || index === 0) {
      let updatedVotes = [...state.votes]
      updatedVotes[index as number] += 1

      dispatch({
        type: 'UPDATE_DATA',
        payload: { ...state, votes: updatedVotes },
      })
    }
  }

  const generateList = (data: filmsResults[], votes: number[]) => {
    return sortDataByDates(data, 'release_date', OrderEnum.ASC).map(
      (item: any, index: number) => {
        return (
          <ListItem
            key={index}
            index={index}
            title={item.title}
            releaseDate={item.release_date}
            handleVoteButtonClick={handleVoteButtonClick}
            votes={votes}
          />
        )
      },
    )
  }

  return (
    <>
      {state.errors && (
        <div data-testid="errors">{state.errors.toString()}</div>
      )}
      {!state.errors && state.loading && (
        <div data-testid="loading">Loading...</div>
      )}

      {state.data?.count && state.data?.count !== 0 && (
        <Table>
          <tbody>
            {generateList(state.data.results, state.votes)}
            <Item key={'total'} isTotalRow={true}>
              <td>Total votes:</td>
              <td>{state.votes.reduce(sum, 0)}</td>
            </Item>
          </tbody>
        </Table>
      )}
      {state.data?.count === 0 && (
        <div data-testid="no-result">No results...</div>
      )}
    </>
  )
}

export default Listing
