import HtmlParser from '../HtmlParser'
import * as fs from 'fs'

describe('HtmlParser', () => {
  let parser: HtmlParser

  beforeEach(() => {
    parser = new HtmlParser()
  })

  it('should return the value "true" for the "parsed" field', () => {
    const html = fs.readFileSync(`${__dirname}/fixtures/no-anchor.html`, 'utf8')
    const response = parser.parse(html)
    expect(response).toEqual({
      parsed: true,
      textContent: expect.anything(),
      links: expect.anything(),
      keywords: expect.anything()
    })
  })

  it('should return the text content of the page', () => {
    const html = fs.readFileSync(`${__dirname}/fixtures/no-anchor.html`, 'utf8')
    const response = parser.parse(html)
    expect(response).toEqual({
      parsed: true,
      textContent: 'test page',
      links: expect.anything(),
      keywords: expect.anything()
    })
  })

  it('should extract all links from anchor elements', () => {
    const html = fs.readFileSync(`${__dirname}/fixtures/multiple-anchors.html`, 'utf8')
    const response = parser.parse(html)
    expect(response).toEqual({
      parsed: true,
      textContent: expect.anything(),
      links: ['/first', '/second'],
      keywords: expect.anything()
    })
  })
})
