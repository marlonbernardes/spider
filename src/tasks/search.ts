// @ts-ignore
import { default as Table } from 'cli-table'

import { Task } from './types'
import { Repository, ElasticSearchRepository } from '../repository'
import settings from '../config/settings'

const repository: Repository = new ElasticSearchRepository(settings.search)

const task: Task<void> = async (answers: any) => {
  const table = new Table({ head: ['URL', 'Title'] })
  const result = await repository.search(answers.filter)
  for (let entry of result.body.hits.hits) {
    table.push([entry._source.title || '', entry._source.url || ''])
  }

  console.log(table.toString())
}

export default task
