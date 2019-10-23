import { Client } from '@elastic/elasticsearch'
import settings from '../src/config/settings'

export async function setUp () {
  const client = new Client({ node: settings.search.endpoint })
  console.log('Creating indexes...')

  try {
    await client.indices.delete({ index: 'pages' })
  } catch (e) {
    console.info('Index could not be deleted as it does not exist.')
  }

  await client.indices.create({
    index: 'pages',
    body: {
      mappings: {
        properties: {
          textContent: { type: 'text' },
          url: { type: 'text' },
          title: { type: 'text' },
          timestamp: { type: 'date' }
        }
      }
    }
  })
}

setUp()
  .then(() => console.log('Done. Elastic search successfully configured.'))
  .catch((e) => console.error('Error while configuring elastic search:', e))
