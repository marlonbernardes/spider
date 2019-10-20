import NoOpParser from './NoOpParser'
import HtmlParser from './HtmlParser'

export interface ParsedResponse {
  parsed: boolean
  links: string[]
  textContent: string
  keywords?: string[]
}

export interface Parser {
  parse (content: string, options: ParsingOptions): ParsedResponse
}

export type ParsingOptions = {
  baseDomain: string
  linksSelector: string
}

export {
  NoOpParser,
  HtmlParser
}
