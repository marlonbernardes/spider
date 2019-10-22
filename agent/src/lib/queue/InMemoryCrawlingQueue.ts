import { CrawlingQueue, MessageHandler } from './types'

export class InMemoryCrawlingQueue implements CrawlingQueue {

  queue: string[]

  constructor() {
    this.queue = []
  }

  // @TODO convert to generator
  async onMessage (callback: MessageHandler) {
    while (this.queue.length > 0) {
      const [url] = this.queue.splice(0, 1)
      await callback(url)
    }
  }

  async add (url: string[]) {
    this.queue = this.queue.concat(url)
  }
}

