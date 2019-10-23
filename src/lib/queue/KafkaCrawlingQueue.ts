import { Kafka, Producer, Consumer } from 'kafkajs'
import * as uuid from 'uuid'
import { KafkaSettings } from '../../config/settings'
import { CrawlingQueue, MessageHandler } from './types'

export class KafkaCrawlingQueue implements CrawlingQueue {

  kafka: Kafka
  consumer: Consumer
  producer: Producer
  settings: KafkaSettings

  constructor (settings: KafkaSettings, groupId: string = uuid.v4()) {
    this.kafka = new Kafka({
      brokers: settings.brokers
    })

    this.settings = settings
    this.producer = this.kafka.producer()
    this.consumer = this.kafka.consumer({ groupId })
  }

  async onMessage (callback: MessageHandler) {
    await this.consumer.subscribe({
      topic: this.settings.topicName,
      fromBeginning: true
    })

    await this.consumer.run({
      partitionsConsumedConcurrently: this.settings.concurrency,
      eachMessage: async ({ topic, partition, message }) => {
        await callback(message.value.toString())
      }
    })
  }

  async sendMessage (url: string[]) {
    const messages = url.map((u) => ({ value: u }))
    const topic = this.settings.topicName
    await this.producer.send({ topic, messages })
  }

}

