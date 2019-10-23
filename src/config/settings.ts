import 'dotenv/config'

const { env } = process

export type CrawlerSettings = {
  linksSelector: string
  includeExternalLinks: boolean
}

export type RedisSettings = {
  host: string
  port: number
}

export type KafkaSettings = {
  topicName: string
  brokers: string[]
  concurrency: number
}

export type ElasticSearchSettings = {
  endpoint: string
}

export type Settings = {
  crawler: CrawlerSettings,
  cache: RedisSettings,
  queue: KafkaSettings
  search: ElasticSearchSettings
}

const settings: Settings = {
  crawler: {
    linksSelector: env.CRAWLER_LINKS_SELECTOR,
    includeExternalLinks: env.CRAWLER_INCLUDE_EXTERNAL_LINKS.toLowerCase() === 'true'
  },

  queue: {
    topicName: env.KAFKA_TOPIC_NAME,
    brokers: env.KAFKA_BROKERS.split(';'),
    concurrency: Number(env.KAFKA_CONSUMER_CONCURRENCY)
  },

  cache: {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT)
  },

  search: {
    endpoint: env.ELASTIC_SEARCH_ENDPOINT,
  }
}

export default settings
