import * as fs from 'fs'
import { Repository, ElasticSearchRepository } from '../repository'
import { CrawlingQueue, KafkaCrawlingQueue } from '../lib/queue'
import Crawler from './crawler'
import { VisitedPagesCache, RedisCache } from '../lib/cache'
import settings from '../config/settings'

export const cache: VisitedPagesCache = new RedisCache(settings.cache)
export const crawler = new Crawler(settings.crawler)
export const repository: Repository = new ElasticSearchRepository(settings.search)

export async function run (consumerId: string, groupId: string) {
  const queue: CrawlingQueue = new KafkaCrawlingQueue(settings.queue, groupId)

  await queue.onMessage(async function crawlUrl(url: string) {
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

async function scheduleUnvisitedChildLinks (queue: CrawlingQueue, urls: string[]) {
  for (let childUrl of urls) {
    if (!await cache.isVisited(childUrl)) {
      await queue.sendMessage([childUrl])
    }
  }
}

function log (message: string) {
  fs.appendFileSync(`${__dirname}/crawler.log`, message + '\n')
}
