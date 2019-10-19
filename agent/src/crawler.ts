import { HttpClient } from './lib/http'
import { Parser, ParsedResponse } from './lib/parser'

export type Parsers = {
  [contentType: string]: Parser
}

class NoOpParser implements Parser {

  parse (content: string) {
    const response: ParsedResponse = {
      parsed: false,
      textContent: '',
      links: [],
      keywords: []
    }
    return response
  }

}


export default class Crawler {

  static NO_OP_PARSER = new NoOpParser()

  constructor (private http: HttpClient, private parsers: Parsers) {}

  crawl (url: string) {
    const response = this.http.get(url)
    const parser = this.parsers[response.contentType] || Crawler.NO_OP_PARSER
    return parser.parse(response.content)
  }

}
