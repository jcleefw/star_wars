import { State } from '../components/Listing'

export enum Actions {
  UPDATE_DATA = 'UPDATE_DATA',
}

// TODO: write test
export const reducer = (
  state: State,
  action: { type: Actions; payload: State },
) => {
  switch (action.type) {
    case Actions.UPDATE_DATA:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
