import { Kafka, Producer, Consumer } from 'kafkajs'
import { KafkaSettings } from '../../config/settings'
import { CrawlingQueue, MessageHandler } from './types'

export class KafkaCrawlingQueue implements CrawlingQueue {

  kafka: Kafka
  consumer: Consumer
  producer: Producer
  settings: KafkaSettings

  constructor(settings: KafkaSettings) {
    this.kafka = new Kafka({
      clientId: settings.clientId,
      brokers: settings.brokers
    })

    this.settings = settings
    this.producer = this.kafka.producer()
    this.consumer = this.kafka.consumer({ groupId: settings.groupId })
  }

  async onMessage (callback: MessageHandler) {
    await this.consumer.subscribe({
      topic: this.settings.topicName,
      fromBeginning: true
    })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        await callback(message.value.toString())
      }
    })
  }

  async add (url: string[]) {
    const messages = url.map(u => ({ value: u}))
    await this.producer.send({ topic: 'test', messages })
  }
}

