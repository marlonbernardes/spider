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
  host: string
  port: number
}

export type Settings = {
  crawler: CrawlerSettings,
  cache: RedisSettings,
  queue: KafkaSettings
}

const settings: Settings = {

  crawler: {
    linksSelector: '[href]',
    includeExternalLinks: false,
  },

  queue: {
    topicName: 'foo',
    groupId: 'test',
    clientId: 'test',
    host: 'localhost',
    port: 9092
  },

  cache: {
    host: 'localhost',
    port: 6379
  }
}

export default settings
