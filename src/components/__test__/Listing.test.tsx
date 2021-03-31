import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import * as utils from '../../utils/api'
import Listing from '../Listing'
import Provider from '../Provider'

describe('Listing', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('when api calls succeed', () => {
    it('and has results', async () => {
      const fetchSpy = jest.spyOn(utils, 'fetchData').mockResolvedValue({
        payload: {
          loading: false,
          data: {
            count: 3,
            results: [
              { title: 'pokemon blue', release_date: '2000-07-29' },
              { title: 'pokemon gold', release_date: '1999-03-01' },
              { title: 'pokemon red', release_date: '2010-08-03' },
            ],
          },
        },
      })

      render(
        <Provider>
          <Listing />
        </Provider>,
      )

      await waitFor(() => screen.getByRole('table'))
      const tableRows = await screen.getAllByRole('row')
      expect(tableRows).toHaveLength(4)
      expect(tableRows[0]).toHaveTextContent(
        'pokemon goldMovie released on 1999-03-010Vote',
      )
      expect(tableRows[1]).toHaveTextContent(
        'pokemon blueMovie released on 2000-07-290Vote',
      )
      expect(tableRows[2]).toHaveTextContent(
        'pokemon redMovie released on 2010-08-030Vote',
      )
      expect(fetchSpy).toBeCalled()
    })

    it('and no results', async () => {
      jest.spyOn(utils, 'fetchData').mockResolvedValue({
        payload: {
          loading: false,
          data: {
            count: 0,
            results: [],
          },
        },
      })

      render(
        <Provider>
          <Listing />
        </Provider>,
      )
      await waitFor(() => screen.getByTestId('no-result'))
      expect(screen.getByTestId('no-result')).toHaveTextContent('No results...')
    })
  })

  describe('when api calls failed', () => {
    it('and has errors', async () => {
      jest.spyOn(utils, 'fetchData').mockResolvedValue({
        payload: {
          loading: false,
          errors: ['this is an error'],
        },
      })
      render(
        <Provider>
          <Listing />
        </Provider>,
      )
      await waitFor(() => screen.getByTestId('errors'))
      expect(screen.getByTestId('errors')).toHaveTextContent('this is an error')
    })
  })

  it('When component is fetching data', () => {
    render(
      <Provider>
        <Listing />
      </Provider>,
    )
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading')
  })
})
