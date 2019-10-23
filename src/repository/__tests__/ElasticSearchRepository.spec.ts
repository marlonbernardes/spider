import { ElasticSearchRepository } from '..'

describe('ElasticSearchRepository', () => {
  let repository: ElasticSearchRepository
  let index: jest.Mock
  let refresh: jest.Mock
  let search: jest.Mock

  beforeEach(() => {
    index = jest.fn()
    refresh = jest.fn()
    search = jest.fn()

    repository = new ElasticSearchRepository({
      endpoint: 'http://localhost:9200'
    })

    repository.client.index = index
    repository.client.search = search
    repository.client.indices.refresh = refresh
  })

  describe('save', () => {
    it('should save the document to the "pages" index', async () => {
      await repository.save({ })
      expect(index).toHaveBeenCalledTimes(1)
      expect(index).toHaveBeenCalledWith({
        index: 'pages',
        body: {
          timestamp: expect.anything()
        }
      })
    })
  })

  describe('search', () => {
    it('should refresh the index before performing the search', async () => {
      await repository.search('filter')
      expect(refresh).toHaveBeenCalledTimes(1)
      expect(refresh).toHaveBeenCalledWith({ index: 'pages' })
    })

    it('should include the textContent property in the search query', async () => {
      await repository.search('filter')
      expect(search).toHaveBeenCalledTimes(1)
      expect(search).toHaveBeenCalledWith({
        index: 'pages',
        body: {
          query: {
            match: {
              textContent: 'filter'
            }
          }
        }
      })
    })
  })
})

