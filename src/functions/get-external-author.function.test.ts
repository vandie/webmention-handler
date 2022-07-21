import { getExternalAuthor } from "./get-external-author.function";
let fetchMock:jest.SpyInstance;
describe('getExternalAuthor', () => {
  beforeEach(() => {
    fetchMock = jest.spyOn(require('./fetch-html.function'), 'fetchHtml').mockImplementation((url) => {
      if(url === 'https://example.org') return {status: 200, html: `<html><body><div class="h-card"><img class="u-photo" src="https://example.org/images/mike.png" alt="Michael Walter Van Der Velden"><h1><a href="/" class="u-url p-name">Michael Walter Van Der Velden</a></h1></div></body></html>`};
      return {error: '404'};
    });
  })
  it('fetches an author correctly', async () => {
    const author = await getExternalAuthor('https://example.org');
    const expected = {"name": "Michael Walter Van Der Velden", "photo": {"alt": "Michael Walter Van Der Velden", "value": "https://example.org/images/mike.png"}, "url": "https://example.org/", "type": "h-card"};
    expect(author).toEqual(expected);
    expect(fetchMock).toHaveBeenCalledWith('https://example.org');
  });
})