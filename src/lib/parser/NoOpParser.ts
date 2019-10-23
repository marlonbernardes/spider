import { Parser, ParsedResponse } from '.'

export default class NoOpParser implements Parser {

  parse () {
    const response: ParsedResponse = {
      parsed: false,
      textContent: '',
      title: '',
      links: [],
      keywords: []
    }
    return response
  }

}
