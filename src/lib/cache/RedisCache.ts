import IORedis from 'ioredis'
import { RedisSettings } from '../../config/settings'
import { VisitedPagesCache } from '.'

export class RedisCache implements VisitedPagesCache {

  static EXPIRATION_TIME_IN_SECONDS = 60 * 30

  client: IORedis.Redis

  constructor (settings: RedisSettings) {
    this.client = new IORedis(settings.port, settings.host)
  }

  async markAsVisited (url: string) {
    this.client.set(url, new Date(), 'EX', RedisCache.EXPIRATION_TIME_IN_SECONDS)
  }

  async isVisited (url: string) {
    return !!(await this.client.get(url))
  }

  async clear () {
    await this.client.flushall()
  }

}
