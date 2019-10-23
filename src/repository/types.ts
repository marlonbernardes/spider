export type Page = {
  textContent: string
  url: string
  title: string
}

export interface Repository {
  save (page: Partial<Page>): Promise<void>
  search (criteria: string): Promise<any>
}

