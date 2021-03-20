const BASE_URL = 'https://swapi.dev/api/'

export interface fetchResponse {
  payload: {
    loading: boolean
    data?: {
      count: number
      results?: any
      error?: any[]
    }
  }
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
