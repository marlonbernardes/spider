import DefaultHttpClient from './DefaultHttpClient'

export interface HttpResponse {
  content: string
  contentType: string
  status: number
}

export interface HttpClient {
  get (url: string): Promise<HttpResponse>
}

export {
  DefaultHttpClient
}
