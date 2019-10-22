import { run } from './runner'

run()
  .then(() => console.log('crawling complete'))
  .catch((e) => console.log('error crawling', e))
