import { isUrl } from "./is-url.function";

describe('isUrl', () => {
  it('should return true if url is valid', () => {
    const validUrls = ['https://example.com', 'http://example.com', 'http://[2001:db8:85a3::8a2e:370:7334]/foo/bar'];
    for(let url of validUrls) {
      expect(isUrl(url)).toEqual(true);
    }
  });

  it('should return false if url is invalid', () => {
    const invalidUrls = ['dog', '123'];
    for(let url of invalidUrls) {
      expect(isUrl(url)).toEqual(false);
    }
  });
});