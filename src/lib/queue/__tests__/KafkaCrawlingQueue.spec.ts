import { KafkaCrawlingQueue } from '..'

describe('KafkaCrawlingQueue', () => {
  let queue: KafkaCrawlingQueue
  let subscribe: jest.Mock
  let send: jest.Mock
  let run: jest.Mock

  beforeEach(() => {
    queue = new KafkaCrawlingQueue(
      {
        brokers: ['localhost:9999'],
        topicName: 'test-topic',
        concurrency: 3
      }
    )

    subscribe = jest.fn()
    send = jest.fn()
    run = jest.fn()

    queue.producer.send = send
    queue.consumer.subscribe = subscribe
    queue.consumer.run = run
  })

  describe('#sendMessage', () => {
    it('should send all URLS to the corresponding topic', () => {
      const urls = ['http://example.com', 'https://monzo.com']
      queue.sendMessage(urls)
      expect(send).toHaveBeenCalledTimes(1)
      expect(send).toHaveBeenCalledWith({
        topic: 'test-topic',
        messages: [
          { value: 'http://example.com' },
          { value: 'https://monzo.com' }
        ]
      })
    })
  })

  describe('#onMessage', () => {
    it('should subscribe the consumer to the specified topic', async () => {
      await queue.onMessage(jest.fn())
      expect(subscribe).toHaveReturnedTimes(1)
      expect(subscribe).toHaveBeenCalledWith({ topic: 'test-topic', fromBeginning: true })
    })
  })
})
