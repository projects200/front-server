export type Exercise = {
  title: string
  category?: string | undefined
  location?: string | undefined
  startedAt: string
  endedAt: string
  content?: string | undefined
  images?: File[] | undefined
}
