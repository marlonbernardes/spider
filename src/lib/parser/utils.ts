/**
 * Converts relative URLs into absolute
 * ones and strips out the hash fragment
 *
 * @param href - the link which needs to be normalised
 * @param baseDomain - the domain to use when converting relative hrefs
 */
export function normaliseUrl (href: string, baseDomain: string) {
  const url = new URL(href, baseDomain)
  return url.href.split('#')[0]
}

/**
 * Returns true if the the href points to an internal resource.
 * Always returns true in case of relative URLs.
 *
 * @param href - the link which needs to be checked
 * @param currentDomain - the current domain
 *
 */
export function isInternalUrl (href: string, currentDomain: string) {
  const left = new URL(href, currentDomain)
  const right = new URL(currentDomain)

  return left.host === right.host
}
