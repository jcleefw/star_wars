import { AnyObject } from '../interface'
export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export const sortDataByDates = (
  data: AnyObject[],
  propertyKey: string,
  order: OrderEnum = OrderEnum.ASC,
) => {
  const sort = data.sort((a, b) => {
    const aDate = new Date(a[propertyKey]).getTime()
    const bDate = new Date(b[propertyKey]).getTime()
    if (aDate < bDate) {
      return -1
    }
    if (aDate > bDate) {
      return 1
    }

    return 0
  })
  return order === OrderEnum.ASC ? sort : sort.reverse()
}
