import { State } from '../components/Listing'

// TODO: write test
export const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return (state = action.payload)
    default:
      return state
  }
}
