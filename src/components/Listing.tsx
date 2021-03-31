import { FC, useEffect, useContext } from 'react'
import {
  fetchData,
  fetchResponse,
  sortDataByDates,
  OrderEnum,
  Actions,
} from '../utils'
import ListItem, { Item } from './ListItem'
import styled from 'styled-components'
import { filmsResults } from '../interface'
import { Context } from './Provider'

interface Props {}

const sum = (total: number, number: number) => {
  return total + number
}

const Table = styled.table`
  width: 100%;
`

const Listing: FC<Props> = () => {
  const { state: storeState, dispatch } = useContext(Context)
  const state = storeState.listing

  useEffect(() => {
    if (!state.loading && !state.data && !state.errors) {
      dispatch({
        type: Actions.UPDATE_DATA,
        payload: { ...storeState, listing: { ...state, loading: true } },
      })
    }

    if (state.loading && (!state.data || !state.errors)) {
      fetchData('films').then((response: fetchResponse) => {
        let votes = response.payload.data
          ? localStorage.getItem('votesReceived')
            ? JSON.parse(localStorage.getItem('votesReceived') as string)
            : new Array(response.payload.data?.count).fill(0)
          : null
        dispatch({
          type: Actions.UPDATE_DATA,
          payload: {
            ...storeState,
            votesReceived: votes,
            listing: { ...response.payload },
          },
        })
      })
    }
  }, [state, dispatch, storeState])

  const handleVoteButtonClick = (index: number | string) => {
    if (Number(index) || index === 0) {
      let updatedVotes = [...(storeState.votesReceived as number[])]
      updatedVotes[index as number] += 1

      dispatch({
        type: Actions.UPDATE_DATA,
        payload: {
          ...storeState,
          votesReceived: updatedVotes,
        },
      })
    }
  }

  const generateList = (data: filmsResults[], votes: number[]) => {
    return sortDataByDates(data, 'release_date', OrderEnum.ASC).map(
      (item: Partial<filmsResults>, index: number) => {
        return (
          <ListItem
            key={index}
            index={index}
            title={item.title as string}
            releaseDate={item.release_date as string}
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
        <>
          <button
            onClick={() =>
              localStorage.setItem(
                'votesReceived',
                JSON.stringify(storeState.votesReceived),
              )
            }>
            Save to Storage
          </button>
          <Table>
            <tbody>
              {generateList(
                state.data.results,
                storeState.votesReceived as number[],
              )}
              <Item key={'total'} isTotalRow={true}>
                <td>Total votes:</td>
                <td>{storeState.votesReceived?.reduce(sum, 0)}</td>
              </Item>
            </tbody>
          </Table>
        </>
      )}
      {state.data?.count === 0 && (
        <div data-testid="no-result">No results...</div>
      )}
    </>
  )
}

export default Listing
