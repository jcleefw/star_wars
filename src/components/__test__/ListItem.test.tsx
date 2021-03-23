import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ListItem from '../ListItem'

describe('ListItem', () => {
  const item = { title: 'pokemon blue', release_date: '2000-07-29' }
  let votesArray = new Array(2).fill(5)
  const mockHandleClick = jest.fn()
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <ListItem
            index={1}
            title={item.title}
            releaseDate={item.release_date}
            handleVoteButtonClick={mockHandleClick}
            votes={votesArray}
          />
        </tbody>
      </table>,
    )
  })

  it('should render component with the number of vote counts', () => {
    const row = screen.getByRole('row')
    expect(row).toHaveTextContent(
      'pokemon blueMovie released on 2000-07-295Vote',
    )
  })

  it('should call handleClick with the index of the item', async () => {
    await waitFor(() => screen.getByText('Vote'))
    fireEvent.click(screen.getByText('Vote'))
    expect(mockHandleClick).toHaveBeenCalledWith(1)
  })
})
