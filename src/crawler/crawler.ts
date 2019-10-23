import { HttpClient, DefaultHttpClient } from '../lib/http'
import { Parser, NoOpParser, HtmlParser } from '../lib/parser'
import { CrawlerSettings } from '../config/settings'

export type Parsers = {
  [contentType: string]: Parser
}

const DEFAULT_PARSERS = {
  'text/html': new HtmlParser()
}

export default class Crawler {

  static NO_OP_PARSER = new NoOpParser()

  parsers: Parsers
  settings: CrawlerSettings
  http: HttpClient

  constructor (
    settings: CrawlerSettings,
    http: HttpClient = new DefaultHttpClient(),
    parsers: Parsers = DEFAULT_PARSERS
  ) {
    this.settings = settings
    this.http = http
    this.parsers = { ...DEFAULT_PARSERS, ...parsers }
  }

  async crawl (url: string) {
    const response = await this.http.get(url)
    const { host, protocol } = new URL(url)
    const parser = this.parsers[response.contentType] || Crawler.NO_OP_PARSER

    return parser.parse(response.content, {
      linksSelector: this.settings.linksSelector,
      baseDomain: `${protocol}//${host}`,
      includeExternalLinks: this.settings.includeExternalLinks
    })
  }

}
