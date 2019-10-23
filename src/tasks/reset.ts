import { Task } from './types'
import { VisitedPagesCache, RedisCache } from '../lib/cache'
import settings from '../config/settings'

const cache: VisitedPagesCache = new RedisCache(settings.cache)

const task: Task<void> = async () => {
  await cache.clear()
}

export default task
