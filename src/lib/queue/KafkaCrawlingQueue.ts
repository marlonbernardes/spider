import { Kafka, Producer, Consumer } from 'kafkajs'
import { CrawlingQueue, MessageHandler } from './types'

export class KafkaCrawlingQueue implements CrawlingQueue {

  kafka: Kafka
  consumer: Consumer
  producer: Producer

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092']
    })

    this.producer = this.kafka.producer()
    this.consumer = this.kafka.consumer({ groupId: 'test-group' })
  }

  async onMessage (callback: MessageHandler) {
    await this.consumer.subscribe({ topic: 'test', fromBeginning: true })

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

