export interface HttpResponse {
  // @TODO: Convert from string to stream? e.g Readable<string>
  content: string
  contentType: string
}

export interface HttpClient {
  get (url: string): HttpResponse
}
