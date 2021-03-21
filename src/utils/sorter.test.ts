import { OrderEnum, sortDataByDates } from './sorter'
describe('#sortDataByDates', () => {
  const item1 = { name: 'zebra', height: 2, releaseDates: new Date('2020-01-01') }
  const item2 = { name: 'avocado', height: 0.3, releaseDates: new Date('2020-09-01') }
  const item3 = { name: 'avocado', height: 0.3, releaseDates: new Date('2020-05-01') }

  const data = [item1, item2, item3]
  it('should sort date ascending order', () => {
    expect(sortDataByDates(data, 'releaseDates', OrderEnum.ASC)).toEqual([item1, item3, item2])
  })

  it('should sort date descending order', () => {
    expect(sortDataByDates(data, 'releaseDates', OrderEnum.DESC)).toEqual([item2, item3, item1])
  })
})
