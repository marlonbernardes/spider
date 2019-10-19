import { OK, NOT_FOUND } from 'http-status'
import DefaultHttpClient from '../DefaultHttpClient'

describe('DefaultHttpClient', () => {
  let client: DefaultHttpClient

  beforeEach(() => {
    client = new DefaultHttpClient()
  })

  describe('when a page is found', () => {
    it('should return the corresponding status code', async () => {
      const response = await client.get('https://monzo.com')
      expect(response.status).toBe(OK)
    })

    it('should fetch HTML content for the specified URL', async () => {
      const response = await client.get('https://monzo.com')
      expect(response.content).toContain('Monzo')
    })

    it('should return the corresponding content type', async () => {
      const response = await client.get('https://monzo.com')
      expect(response.contentType).toEqual('text/html')
    })
  })

  describe('when a page is not found', () => {
    it('should return the corresponding status code', async () => {
      const response = await client.get('https://example.com/404')
      expect(response.status).toBe(NOT_FOUND)
    })
  })
})
