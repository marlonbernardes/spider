import * as cheerio from 'cheerio'
import settings from '../../config/settings'

import { Parser, ParsedResponse } from '.'

export default class HtmlParser implements Parser {

  parse (html: string) {
    const $ = cheerio.load(html)
    const links = this.extractLinks($)

    const response: ParsedResponse = {
      parsed: true,
      textContent: $.root().text().trim(),
      links,
      keywords: []
    }
    return response
  }

  private extractLinks ($: CheerioStatic) {
    const links: string[] = []
    $(settings.linksSelector).each((_, el) => {
      const link = $(el).attr('href')
      links.push(link)
    })

    return links
  }

}
