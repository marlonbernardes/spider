import * as uuid from 'uuid'
import { Task } from './types'
import { run } from '../runner'
import { CrawlingQueue, KafkaCrawlingQueue } from '../lib/queue'
import settings from '../config/settings'

const queue: CrawlingQueue = new KafkaCrawlingQueue(settings.queue)

const task: Task<void> = async (answers: any) => {
  const groupId = uuid.v4()

  await Promise.all([
    run('crawling-agent-1', groupId),
    run('crawling-agent-2', groupId),
    run('crawling-agent-3', groupId)
  ])

  await queue.sendMessage([answers.url])

  console.log()
  console.log()
  console.log(`\t${answers.url} is being crawled.`)
  console.log('\tYou can check the progress by running the following command:')
  console.log(`\t tail -f ${__dirname}/crawler.log`)
  console.log()
  console.log()
}

export default task
