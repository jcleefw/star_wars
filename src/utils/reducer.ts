import { StoreState } from '../interface'

export enum Actions {
  UPDATE_DATA = 'UPDATE_DATA',
}

export const Reducer = (
  state: StoreState,
  action: { type: Actions; payload: Partial<StoreState> },
) => {
  switch (action.type) {
    case Actions.UPDATE_DATA:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
