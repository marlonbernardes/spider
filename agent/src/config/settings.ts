interface Settings {
  // css selector used to obtain the links
  // contained in a certain page
  linksSelector: string

  // indicates if links to different hosts should be included
  // when fetching the child links
  includeExternalLinks: boolean
}

const settings: Settings = {
  linksSelector: '[href]',
  includeExternalLinks: false
}

export default settings
