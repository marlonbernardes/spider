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
  // domain used to transform from relative urls to absolute ones
  baseDomain: string
  // CSS selector used to find child links in the current page that's being crawled
  linksSelector: string
  // Indicates if links to different hosts should be included in the "links" attribute
  includeExternalLinks: boolean
}

