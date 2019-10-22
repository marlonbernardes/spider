import { HttpClient } from './lib/http'
import { Parser, NoOpParser } from './lib/parser'
import settings from './config/settings'
import { HtmlParser } from './lib/parser'

export type Parsers = {
  [contentType: string]: Parser
}

const DEFAULT_PARSERS = {
  'text/html': new HtmlParser()
}

export default class Crawler {

  static NO_OP_PARSER = new NoOpParser()

  parsers: Parsers

  constructor (private http: HttpClient, parsers: Parsers = DEFAULT_PARSERS) {
    this.parsers = Object.assign({}, DEFAULT_PARSERS, parsers)
  }

  async crawl (url: string) {
    const response = await this.http.get(url)
    const { host, protocol } = new URL(url)
    const parser = this.parsers[response.contentType] || Crawler.NO_OP_PARSER

    return parser.parse(response.content, {
      linksSelector: settings.linksSelector,
      baseDomain: `${protocol}//${host}`,
      includeExternalLinks: settings.includeExternalLinks
    })
  }

}
