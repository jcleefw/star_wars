import { AnyObject, ResponsePayload } from '../interface'

const BASE_URL = 'https://swapi.dev/api/'

export interface fetchResponse {
  payload: ResponsePayload
}

export const fetchData = (url: string): Promise<fetchResponse> => {
  return fetch(`${BASE_URL}${url}`)
    .then((res) => res.json())
    .then((data: fetchResponse['payload']['data']) => {
      return { payload: { loading: false, data } }
    })
    .catch((err) => {
      return { payload: { loading: false, errors: err } }
    })
}
