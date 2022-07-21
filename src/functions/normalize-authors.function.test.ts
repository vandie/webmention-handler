import { normalizeAuthors } from "./normalize-authors.function";

let fetchMock:jest.SpyInstance;
describe('normalizeAuthors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock = jest.spyOn(require('./fetch-html.function'), 'fetchHtml').mockImplementation((url) => {
      if(url === 'https://example.org') return {status: 200, html: `<html><body><div class="h-card"><img class="u-photo" src="https://example.org/images/mike.png" alt="Michael Walter Van Der Velden"><h1><a href="/" class="u-url p-name">Michael Walter Van Der Velden</a></h1></div></body></html>`};
      return {error: '404'};
    });
  });

  it('correctly handles a single author', async () => {
    const authors = await normalizeAuthors('https://example.org');
    const expected = {"name": "Michael Walter Van Der Velden", "photo": {"alt": "Michael Walter Van Der Velden", "value": "https://example.org/images/mike.png"}, "url": "https://example.org/", "type": "h-card"};
    expect(authors).toEqual(expected);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('https://example.org');
  });

  it('correctly handles multiple authors', async () => {
    const authors = await normalizeAuthors(['https://example.org', 'https://example.org']);
    const expected = {"name": "Michael Walter Van Der Velden", "photo": {"alt": "Michael Walter Van Der Velden", "value": "https://example.org/images/mike.png"}, "url": "https://example.org/", "type": "h-card"};
    expect(authors).toEqual([expected, expected]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith('https://example.org');
  });

  it('correctly handles multiple authors where one is invalid', async () => {
    const authors = await normalizeAuthors(['https://example.org', 'https://example.com']);
    const expected = {"name": "Michael Walter Van Der Velden", "photo": {"alt": "Michael Walter Van Der Velden", "value": "https://example.org/images/mike.png"}, "url": "https://example.org/", "type": "h-card"};
    expect(authors).toEqual([expected, 'https://example.com']);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith('https://example.org');
    expect(fetchMock).toHaveBeenCalledWith('https://example.com');
  });

  it('correctly handles an already normalized author', async () => {
    const expected = {"name": "Michael Walter Van Der Velden", "photo": {"alt": "Michael Walter Van Der Velden", "value": "https://example.org/images/mike.png"}, "url": "https://example.org/", "type": "h-card"};
    const authors = await normalizeAuthors(expected);
    expect(authors).toEqual(expected);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});