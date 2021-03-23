export interface AnyObject {
  [key: string]: any
}

export interface ResponsePayload {
  loading: boolean
  data?: {
    count: number
    results?: AnyObject[]
  }
  errors?: any[]
}
