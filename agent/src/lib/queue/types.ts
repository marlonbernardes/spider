export type MessageHandler = (args: any) => Promise<void>

export interface CrawlingQueue {

  onMessage (callback: MessageHandler): Promise<any>
  add (url: string[]): Promise<any>
}

