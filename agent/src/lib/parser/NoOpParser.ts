import { Parser, ParsedResponse } from '.'

export default class NoOpParser implements Parser {

  parse () {
    const response: ParsedResponse = {
      parsed: false,
      textContent: '',
      links: [],
      keywords: []
    }
    return response
  }

}
