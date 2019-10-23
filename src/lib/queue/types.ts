export type MessageHandler = (args: any) => Promise<void>

export interface CrawlingQueue {

  onMessage (callback: MessageHandler): Promise<any>
  sendMessage (url: string[]): Promise<any>
}

