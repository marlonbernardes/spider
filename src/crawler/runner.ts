import * as fs from 'fs'
import { Repository, ElasticSearchRepository } from '../repository'
import { CrawlingQueue, KafkaCrawlingQueue } from '../lib/queue'
import Crawler from './crawler'
import { VisitedPagesCache, RedisCache } from '../lib/cache'
import settings from '../config/settings'
import os from 'os'
import path from 'path'

export const LOG_FILE_PATH  = path.join(os.homedir(), 'crawler.log')
export const cache: VisitedPagesCache = new RedisCache(settings.cache)
export const crawler = new Crawler(settings.crawler)
export const repository: Repository = new ElasticSearchRepository(settings.search)

function log (message: string) {
  fs.appendFileSync(LOG_FILE_PATH, `${message}\n`)
}

async function scheduleUnvisitedChildLinks (queue: CrawlingQueue, urls: string[]) {
  for (const childUrl of urls) {
    if (!await cache.isVisited(childUrl)) {
      await queue.sendMessage([childUrl])
    }
  }
}

export async function run (consumerId: string, groupId: string) {
  const queue: CrawlingQueue = new KafkaCrawlingQueue(settings.queue, groupId)

  await queue.onMessage(async (url: string) => {
    try {
      if (await cache.isVisited(url)) {
        log(`INFO\t [${consumerId}] Skipping ${url} as it's been crawled recently.`)
      } else {
        const response = await crawler.crawl(url)
        const { textContent, title } = response

        await repository.save({ textContent, title, url })
        await cache.markAsVisited(url)

        log(`INFO\t [${consumerId}] Finished crawling ${url}`)
        await scheduleUnvisitedChildLinks(queue, response.links)
      }
    } catch (e) {
      log(`ERROR\t [${consumerId}] Error encountered while crawling ${url}: ${e.message}`)
    }
  })
}

