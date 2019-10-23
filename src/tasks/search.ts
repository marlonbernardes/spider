import Table from 'cli-table'
import { Task } from './types'
import { Repository, ElasticSearchRepository } from '../repository'
import settings from '../config/settings'

const repository: Repository = new ElasticSearchRepository(settings.search)

const task: Task<void> = async (answers: any) => {
  const table = new Table({ head: ['URL', 'Title'] })
  const result = await repository.search(answers.filter)

  for (const entry of result.body.hits.hits) {
    // eslint-disable-next-line no-underscore-dangle
    table.push([entry._source.title || '', entry._source.url || ''])
  }

  if (table.length > 0) {
    console.log(table.toString())
  } else {
    console.log('\nNo results found.\n')
  }
}

export default task
