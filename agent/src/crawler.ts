import { HttpClient } from './lib/http'
import { Parser, NoOpParser } from './lib/parser'
import settings from './config/settings'

export type Parsers = {
  [contentType: string]: Parser
}

export default class Crawler {

  static NO_OP_PARSER = new NoOpParser()

  constructor (private http: HttpClient, private parsers: Parsers) {}

  async crawl (url: string) {
    const response = await this.http.get(url)
    const { host } = new URL(url)
    const parser = this.parsers[response.contentType] || Crawler.NO_OP_PARSER
    return parser.parse(response.content, {
      linksSelector: settings.linksSelector,
      baseDomain: host
    })
  }

}
