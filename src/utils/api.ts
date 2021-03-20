const BASE_URL = 'https://swapi.dev/api/'

export const fetchData = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then((res) => res.json())
    .then((data) => {
      return { payload: { loading: false, data } }
    })
    .catch((err) => {
      return { payload: { loading: false, errors: err } }
    })
}
