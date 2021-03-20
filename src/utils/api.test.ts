import * as Api from './api'
import { enableFetchMocks } from 'jest-fetch-mock'
import { fetchResponse } from './api'
enableFetchMocks()

describe('api', () => {
  const reducer = jest.fn()

  let mockData = {
    results: ['hello', 'world'],
  }

  const BASE_URL = 'https://swapi.dev/api'

  beforeEach(() => {
    fetchMock.resetMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetchData successfully with results returned', async () => {
    mockData = {
      results: ['hello', 'world'],
    }
    const expectedResults = {
      payload: { loading: false, data: mockData },
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockData))
    Api.fetchData('star-wars').then((res: fetchResponse) => {
      expect(res).toEqual(expectedResults)
    })

    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(`${BASE_URL}/star-wars`)
  })

  it('fetchData successfully with no results returned', async () => {
    mockData = {
      results: [],
    }
    const expectedResults = {
      payload: { loading: false, data: mockData },
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockData))
    Api.fetchData('star-wars').then((res: fetchResponse) => {
      expect(res).toEqual(expectedResults)
    })

    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(`${BASE_URL}/star-wars`)
  })

  it('fetchData failed', async () => {
    const mockErrors = {
      message: 'not found',
    }
    const expectedResults = {
      payload: { loading: false, errors: mockErrors },
    }

    fetchMock.mockRejectedValue(mockErrors)
    Api.fetchData('darth-vader').then((res: fetchResponse) => {
      expect(res).toEqual(expectedResults)
    })

    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(`${BASE_URL}/darth-vader`)
  })
})
