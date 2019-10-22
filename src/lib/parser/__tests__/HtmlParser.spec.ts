import * as fs from 'fs'
import HtmlParser from '../HtmlParser'
import { ParsingOptions } from '..'

describe('HtmlParser', () => {
  let parser: HtmlParser
  let options: ParsingOptions

  beforeEach(() => {
    parser = new HtmlParser()
    options = {
      linksSelector: '[href]',
      baseDomain: 'http://example.com',
      includeExternalLinks: true
    }
  })

  it('should return the value "true" for the "parsed" field', () => {
    const html = fs.readFileSync(`${__dirname}/fixtures/no-anchor.html`, 'utf8')
    const response = parser.parse(html, options)
    expect(response).toEqual({
      parsed: true,
      textContent: expect.anything(),
      links: expect.anything(),
      keywords: expect.anything()
    })
  })

  it('should return the text content of the page', () => {
    const html = fs.readFileSync(`${__dirname}/fixtures/no-anchor.html`, 'utf8')
    const response = parser.parse(html, options)
    expect(response).toEqual({
      parsed: true,
      textContent: 'test page',
      links: expect.anything(),
      keywords: expect.anything()
    })
  })

  it('should extract all links from anchor elements', () => {
    const html = fs.readFileSync(`${__dirname}/fixtures/multiple-anchors.html`, 'utf8')
    const response = parser.parse(html, options)
    expect(response).toEqual({
      parsed: true,
      textContent: expect.anything(),
      links: [
        'http://example.com/first',
        'http://example.com/second'
      ],
      keywords: expect.anything()
    })
  })

  describe('when parsing a page with both absolute and relative URLS', () => {
    it('should convert relative urls to absolute', () => {
      const html = fs.readFileSync(`${__dirname}/fixtures/multiple-anchor-urls.html`, 'utf8')
      const response = parser.parse(html, options)
      expect(response).toEqual({
        parsed: true,
        textContent: expect.anything(),
        links: [
          'http://example.com/first',
          'http://example.com/second',
          'http://example.com/third',
          'http://test.com/'
        ],
        keywords: expect.anything()
      })
    })

    it('should be possible to specify which URLs should be crawled', () => {
      const html = fs.readFileSync(`${__dirname}/fixtures/multiple-anchor-urls.html`, 'utf8')
      const response = parser.parse(html, {
        ...options,
        includeExternalLinks: false
      })
      expect(response).toEqual({
        parsed: true,
        textContent: expect.anything(),
        links: [
          'http://example.com/first',
          'http://example.com/second',
          'http://example.com/third'
        ],
        keywords: expect.anything()
      })
    })
  })
})
