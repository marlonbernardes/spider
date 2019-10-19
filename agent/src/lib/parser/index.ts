import NoOpParser from './NoOpParser'

export interface ParsedResponse {
  parsed: boolean
  links: string[]
  textContent: string
  keywords?: string[]
}

export interface Parser {
  parse (content: string): ParsedResponse
}

export {
  NoOpParser
}
