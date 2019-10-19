import NoOpParser from './NoOpParser'
import HtmlParser from './HtmlParser'

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
  NoOpParser,
  HtmlParser
}
