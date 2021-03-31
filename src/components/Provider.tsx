import { FC, createContext, useReducer, Dispatch } from 'react'
import { StoreState } from '../interface'
import { Actions, Reducer } from '../utils'

const initialState: StoreState = {
  votesReceived: null,
  listing: {
    loading: false,
    data: null,
    errors: null,
  },
}

interface ContextProps {
  state: StoreState
  dispatch: Dispatch<{ type: Actions; payload: StoreState }>
}

export const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
})

interface Props {
  children: any
}
const Provider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default Provider
