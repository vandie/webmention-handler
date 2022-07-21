import path from "path";
import fs from "fs";
import { getExternalAuthor } from "./get-external-author.function";

let fetchMock:jest.SpyInstance;
describe('getExternalAuthor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock = jest.spyOn(require('./fetch-html.function'), 'fetchHtml').mockImplementation((url) => {
      if(url === 'https://example.org') return {
        status: 200,
        html: fs.readFileSync(path.join(__dirname, '../test-data/html-author.html'), 'utf8')
    };
      return {error: '404'};
    });
  });
  it('fetches an author correctly', async () => {
    const author = await getExternalAuthor('https://example.org');
    const expected = {
      "name": "Michael Walter Van Der Velden",
      "photo": {
        "alt": "Michael Walter Van Der Velden",
        "value": "https://example.org/images/mike.png"
      },
      "url": "https://example.org/",
      "type": "h-card"
    };
    expect(author).toEqual(expected);
    expect(fetchMock).toHaveBeenCalledWith('https://example.org');
  });
})