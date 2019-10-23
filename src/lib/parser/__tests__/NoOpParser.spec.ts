import NoOpParser from '../NoOpParser'

describe('NoOpParser', () => {
  let parser: NoOpParser

  beforeEach(() => {
    parser = new NoOpParser()
  })

  it('should return the value "false" for the "parsed" field', () => {
    const response = parser.parse()
    expect(response).toEqual({
      parsed: false,
      textContent: expect.anything(),
      links: expect.anything(),
      keywords: expect.anything(),
      title: expect.anything()
    })
  })

  it('should return an empty array of keywords and links', () => {
    const response = parser.parse()
    expect(response).toEqual({
      parsed: expect.anything(),
      textContent: expect.anything(),
      links: [],
      keywords: [],
      title: ''
    })
  })

  it('should return an empty string as the textual content', () => {
    const response = parser.parse()
    expect(response).toEqual({
      parsed: expect.anything(),
      textContent: '',
      links: expect.anything(),
      keywords: expect.anything(),
      title: expect.anything()
    })
  })
})
