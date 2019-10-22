import Crawler from './crawler'
import { save } from './es'
import { CrawlingQueue, KafkaCrawlingQueue } from './lib/queue'
import { VisitedPagesCache, RedisCache } from './lib/cache'
import settings from './config/settings'

const cache: VisitedPagesCache = new RedisCache(settings.cache)
const queue: CrawlingQueue = new KafkaCrawlingQueue(settings.queue)
const crawler = new Crawler(settings.crawler)

async function process (url: string) {
  try {
    if (await cache.isVisited(url)) {
      console.log(`skipping ${url} as it's already cached`)
    } else {
      const response = await crawler.crawl(url)
      console.log(`finished crawling ${url}`)

      await save({
        textContent: response.textContent,
        timestamp: new Date()
      })

      await cache.markAsVisited(url)

      for (let childUrl of response.links) {
        if (!await cache.isVisited(childUrl)) {
           await queue.add([childUrl])
        }
      }
    }
  } catch (e) {
    console.log(`error crawling ${url}`, e.message)
  }
}

export async function run () {
  // @TODO remove cache clear
  await cache.clear()
  await queue.add(['http://codeheaven.io'])
  await queue.onMessage(process)
}

