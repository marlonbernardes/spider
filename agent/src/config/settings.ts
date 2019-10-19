interface Settings {
  // css selector used to obtain the links
  // contained in a certain page
  linksSelector: string
}

const settings: Settings = {
  linksSelector: '[href]'
}

export default settings
