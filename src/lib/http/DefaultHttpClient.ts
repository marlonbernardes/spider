import axios from 'axios'
import { HttpClient, HttpResponse } from '.'

export default class DefaultHttpClient implements HttpClient {

  async get (url: string): Promise<HttpResponse> {
    const response = await axios.get(url, {
      // do not reject promise when status is between 2xx and 4xx
      validateStatus: (status) => status >= 200 && status < 500
    })
    const contentTypeHeader = response.headers['content-type']

    // strip out the content type header comment
    const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0] : ''

    return {
      content: response.data,
      status: response.status,
      contentType
    }
  }

}
