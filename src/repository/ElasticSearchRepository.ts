import { Client } from '@elastic/elasticsearch'
import { Repository, Page } from './types'
import { ElasticSearchSettings } from '../config/settings'

export class ElasticSearchRepository implements Repository {

  client: Client

  constructor (settings: ElasticSearchSettings) {
    this.client = new Client({ node: settings.endpoint })
  }

  async save (page: Partial<Page>) {
    await this.client.index({
      index: 'pages',
      body: {
        ...page,
        timestamp: new Date()
      }
    })
  }

  async search (textContent: string) {
    await this.client.indices.refresh({ index: 'pages' })
    return await this.client.search({
      index: 'pages',
      body: {
        query: {
          match: { textContent }
        }
      }
    })
  }

}

