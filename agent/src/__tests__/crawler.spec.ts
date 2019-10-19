import Crawler, { Parsers } from '../crawler'
import { HttpClient, HttpResponse } from '../lib/http'
import { Parser, ParsedResponse } from '../lib/parser'
import { lookup } from 'mime-types'

const MOCK_HTML_RESPONSE = '<html><body>this is a test page</body></html>'
const MOCK_JSON_RESPONSE = '{ "foo": "bar" }'

class MockHttpClient implements HttpClient {

  get (url: string): HttpResponse {
    const contentType = lookup(url) || 'text/html'
    const contentByType = {
      'text/html': MOCK_HTML_RESPONSE,
      'application/json': MOCK_JSON_RESPONSE
    }
    return {
      contentType,
      content: contentByType[contentType]
    }
  }
}

class MockHtmlParser implements Parser {

  parse (content: string) {
    const response: ParsedResponse = {
      parsed: true,
      links: [],
      textContent: content.replace(/<[^>]*>/g, ''),
      keywords: []
    }

    return response
  }
}

class MockJsonParser implements Parser {

  parse (content: string) {
    const response: ParsedResponse = {
      parsed: true,
      links: [],
      textContent: content,
      keywords: []
    }

    return response
  }
}
describe('crawler', () => {

  let crawler: Crawler
  let http: HttpClient
  let htmlParser: MockHtmlParser
  let jsonParser: MockJsonParser
  let parsers: Parsers

  beforeEach(() => {
    http = new MockHttpClient()
    jsonParser = new MockJsonParser()
    htmlParser = new MockHtmlParser()
    parsers = {
      'application/json': jsonParser,
      'text/html': htmlParser
    }
    crawler = new Crawler(http, parsers)
  })

  describe('when crawling an URL', () => {
    it('should return the text content of the corresponding page', () => {
      expect(
        crawler.crawl('http://example.com/a.html'))
          .toEqual({
            parsed: true,
            links: [],
            textContent: 'this is a test page',
            keywords: []
          })
    })

    it('should use the parser for the corresponding content type', () => {
      expect(
        crawler.crawl('http://example.com/b.json'))
          .toEqual({
            parsed: true,
            links: [],
            textContent: MOCK_JSON_RESPONSE,
            keywords: []
          })
    })
  })

  describe('when no parser has been found for the content type', () => {
    it ('should return a property "parsed" with "false" as value', () => {
      expect(
        crawler.crawl('http://example.com/c.md'))
          .toEqual({
            parsed: false,
            links: [],
            textContent: '',
            keywords: []
          })
    })
  })


})
