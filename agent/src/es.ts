import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: 'http://localhost:9200 '})

export async function createIndex () {
  console.log('trying to create')
  await client.indices.delete({ index: 'pages' })
  await client.indices.create({
    index: 'pages',
    body: {
        mappings: {
          properties: {
            textContent: { type: 'text' },
            timestamp: { type: 'date' }
          }
        }
    }
  })
  console.log('created index')
}

export async function refresh () {
  return client.indices.refresh({ index: 'pages' })
}

export async function save (body: object) {
  await client.index({
    index: 'pages',
    body
  })
}

export async function search () {
  const result = await client.search({
    index: 'pages',
    body: {
      query: {
        match: {
          textContent: 'axios'
        }
      }
    }
  })

  console.log('result', result.body.hits.hits)

}

