export async function apiHandler<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    let message = '백엔드 통신 실패'
    if (err instanceof Error) {
      message = err.message
    } else if (typeof err === 'string') {
      message = err
    }
    throw new Error(message)
  }
}
