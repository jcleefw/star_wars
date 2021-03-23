export interface AnyObject {
  [key: string]: any
}

export interface filmsResults {
  title: string
  release_date: string
}

export interface ResponsePayload {
  loading: boolean
  data?: {
    count: number
    results: filmsResults[]
  }
  errors?: any[]
}
