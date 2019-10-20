import Crawler from './crawler'
import { DefaultHttpClient } from './lib/http'
import { HtmlParser } from './lib/parser'

// @TODO Move to kafka
let toCrawl: string[] = ['https://monzo.com']

// @TODO Move to redis
const cached: string[] = []

const http = new DefaultHttpClient()
const parser = new HtmlParser()

const crawler = new Crawler(http, {
  'text/html': parser
})

export async function run () {
  while (toCrawl.length > 0) {
    const [url] = toCrawl.splice(0, 1)
    try {
      if (cached.includes(url)) {
        console.log(`skipping ${url} as it's already cached`)
      } else {
        const response = await crawler.crawl(url)
        console.log(`finished crawling ${url}`, toCrawl.length)
        cached.push(url)
        toCrawl = toCrawl.concat(response.links)
      }
    } catch (e) {
      console.log(`error crawling ${url}`)
    }
  }
}

