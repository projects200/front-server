export type ApiResponse<T> = {
  succeed: boolean
  code: string
  message: string
  data: T
}

export class ApiError extends Error {
  readonly status: number
  readonly payload?: unknown

  constructor(message: string, status: number = 500, payload?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}
