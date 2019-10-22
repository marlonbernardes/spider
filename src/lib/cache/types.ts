export interface VisitedPagesCache {
  isVisited (url: string): Promise<boolean>
  markAsVisited (url: string): Promise<void>
  clear (): Promise<void>
}

