import { isInternalUrl, normaliseUrl } from '../utils'

describe('#isInternalUrl', () => {
  it('should return true if the link is relative', () => {
    expect(isInternalUrl('/test', 'http://example.com')).toBeTruthy()
    expect(isInternalUrl('./foo', 'http://example.com')).toBeTruthy()
    expect(isInternalUrl('../foo', 'http://example.com')).toBeTruthy()
  })

  it('should return true if the link is absolute and points to an internal host', () => {
    expect(isInternalUrl('http://example.com/test', 'http://example.com')).toBeTruthy()
    expect(isInternalUrl('http://example.com/foo', 'http://example.com')).toBeTruthy()
  })

  it('should return false if the link is absolute and points to an external host', () => {
    expect(isInternalUrl('http://foo.example.com/test', 'http://example.com')).toBeFalsy()
    expect(isInternalUrl('http://bar.com/foo', 'http://example.com')).toBeFalsy()
  })
})

describe('#normaliseUrl', () => {
  it('should convert relative URLs to absolute', () => {
    expect(normaliseUrl('/test', 'http://example.com')).toEqual('http://example.com/test')
    expect(normaliseUrl('./test', 'http://example.com')).toEqual('http://example.com/test')
    expect(normaliseUrl('../foo', 'http://example.com')).toEqual('http://example.com/foo')
  })

  it('should remove the hash fragment', () => {
    expect(normaliseUrl('./test#menu-item', 'http://example.com')).toEqual('http://example.com/test')
    expect(normaliseUrl('http://example.com/test#title', 'http://example.com')).toEqual('http://example.com/test')
  })
})
