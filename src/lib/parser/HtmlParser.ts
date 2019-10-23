import * as cheerio from 'cheerio'
import { isInternalUrl, normaliseUrl } from './utils'

import { Parser, ParsedResponse, ParsingOptions } from '.'

export default class HtmlParser implements Parser {

  parse (html: string, options: ParsingOptions) {
    const $ = cheerio.load(html)
    const links = this.extractLinks($, options)
    const $title = $('title').first()

    const response: ParsedResponse = {
      parsed: true,
      textContent: $.root().text().trim(),
      title: $title ? $title.text().replace(/\s\s+/g, '').trim() : '',
      links,
      keywords: []
    }
    return response
  }

  private extractLinks ($: CheerioStatic, options: ParsingOptions) {
    const links: string[] = []

    $(options.linksSelector).each((_, el) => {
      const href = $(el).attr('href')

      if (options.includeExternalLinks || isInternalUrl(href, options.baseDomain)) {
        links.push(normaliseUrl(href, options.baseDomain))
      }
    })

    return links
  }

}
