export interface ParsedResponse {
  parsed: boolean
  links: string[]
  textContent: string
  keywords?: string[]
}

export interface Parser {

  // @TODO convert to Readable<string>?
  parse (content: string): ParsedResponse
}

