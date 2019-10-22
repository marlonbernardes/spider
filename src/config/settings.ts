import 'dotenv/config'

const { env } = process

export type CrawlerSettings = {
  // css selector used to obtain the links
  // contained in a certain page
  linksSelector: string

  // indicates if links to different hosts should be included
  // when fetching the child links
  includeExternalLinks: boolean
}

export type RedisSettings = {
  host: string
  port: number
}

export type KafkaSettings = {
  topicName: string
  groupId: string
  clientId: string
  brokers: string[]
}

export type Settings = {
  crawler: CrawlerSettings,
  cache: RedisSettings,
  queue: KafkaSettings
}

const settings: Settings = {
  crawler: {
    linksSelector: env.CRAWLER_LINKS_SELECTOR,
    includeExternalLinks: env.CRAWLER_INCLUDE_EXTERNAL_LINKS.toLowerCase() === 'true'
  },

  queue: {
    topicName: env.KAFKA_TOPIC_NAME,
    groupId: env.KAFKA_GROUP_ID,
    clientId: env.KAFKA_CLIENT_ID,
    brokers: env.KAFKA_BROKERS.split(';')
  },

  cache: {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT)
  }
}

export default settings
