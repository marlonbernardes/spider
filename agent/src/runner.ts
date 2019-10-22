import Crawler from './crawler'
import { DefaultHttpClient } from './lib/http'
import { save } from './es'
import { CrawlingQueue, InMemoryCrawlingQueue } from './lib/queue'
import { VisitedPagesCache, RedisCache } from './lib/cache'

const cache: VisitedPagesCache = new RedisCache()
const queue: CrawlingQueue = new InMemoryCrawlingQueue()
const http = new DefaultHttpClient()
const crawler = new Crawler(http)

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

