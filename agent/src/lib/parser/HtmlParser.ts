import * as cheerio from 'cheerio'

import { Parser, ParsedResponse, ParsingOptions } from '.'

export default class HtmlParser implements Parser {

  parse (html: string, options: ParsingOptions) {
    const $ = cheerio.load(html)
    const links = this.extractLinks($, options)

    const response: ParsedResponse = {
      parsed: true,
      textContent: $.root().text().trim(),
      links,
      keywords: []
    }
    return response
  }

  private extractLinks ($: CheerioStatic, options: ParsingOptions) {
    const links: string[] = []

    $(options.linksSelector).each((_, el) => {
      const link = $(el).attr('href')
      const url = new URL(link, options.baseDomain)
      const baseDomain = new URL(options.baseDomain)

      if (options.includeExternalLinks || url.host === baseDomain.host) {
        links.push(url.href)
      }
    })

    return links
  }

}
