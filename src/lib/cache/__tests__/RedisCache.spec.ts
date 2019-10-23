import { RedisCache } from '..'

describe('RedisCache', () => {
  let cache: RedisCache
  let get: jest.Mock
  let set: jest.Mock
  let flushall: jest.Mock

  beforeEach(() => {
    cache = new RedisCache({ host: 'example', port: 123 })
    get = jest.fn()
    set = jest.fn()
    flushall = jest.fn()
    cache.client.get = get
    cache.client.set = set
    cache.client.flushall = flushall
  })

  describe('#markAsVisited', () => {
    it('should store the received URL in the cache for 1800 seconds', async () => {
      const url = 'http://example.com/foo'
      await cache.markAsVisited(url)
      expect(set).toHaveBeenCalledTimes(1)
      expect(set).toHaveBeenCalledWith(url, expect.anything(), 'EX', 1800)
    })
  })

  describe('#isVisited', () => {
    it('should return true if the URL exists in the cache', async () => {
      get.mockResolvedValueOnce(true)
      const result = await cache.isVisited('http://example.com/foo')
      expect(result).toEqual(true)
    })

    it('should return false if the URL does not exist in the cache', async () => {
      get.mockResolvedValueOnce(false)
      const result = await cache.isVisited('http://example.com/foo')
      expect(result).toEqual(false)
    })
  })

  describe('#clear', () => {
    it('should call Redis FLUSHALL command', async () => {
      await cache.clear()
      expect(flushall).toHaveBeenCalledTimes(1)
    })
  })
})
