import inquirer from 'inquirer'
import tasks from './tasks'

const questions = [
  {
    type: 'list',
    name: 'action',
    message: '👋 Hi! What do you want to do?',
    choices: [
      { name: '🕷️  Crawl a website.', value: 'crawl' },
      { name: '🔍  Search the crawled document database.', value: 'search' },
      { name: '🗑️  Clear redis cache (allows the same page to be crawled again).', value: 'reset' },
      { name: '⬅️  Quit.', value: 'quit' }
    ]
  },
  {
    type: 'text',
    name: 'url',
    message: 'What URL do you want to crawl?',
    default: 'https://monzo.com',
    when: ({ action }: any) => action === 'crawl'
  },
  {
    type: 'text',
    name: 'filter',
    message: 'What do you want to search?',
    when: ({ action }: any) => action === 'search'
  }
]

async function execute () {
  const answers = await inquirer.prompt(questions)
  const task = tasks[answers.action]
  await task(answers)
  execute()
}

execute()

