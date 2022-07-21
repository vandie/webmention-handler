import path from "path";
import fs from "fs";
import { normalizeAuthors } from "./normalize-authors.function";

let fetchMock:jest.SpyInstance;
const exampleJSON = {
  "name": "Michael Walter Van Der Velden",
  "photo": {
    "alt": "Michael Walter Van Der Velden",
    "value": "https://example.org/images/mike.png"
  },
  "url": "https://example.org/",
  "type": "h-card"
};

describe('normalizeAuthors', () => {
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

  it('correctly handles a single author', async () => {
    const authors = await normalizeAuthors('https://example.org');
    expect(authors).toEqual(exampleJSON);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('https://example.org');
  });

  it('correctly handles multiple authors', async () => {
    const authors = await normalizeAuthors(['https://example.org', 'https://example.org']);
    expect(authors).toEqual([exampleJSON, exampleJSON]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith('https://example.org');
  });

  it('correctly handles multiple authors where one is invalid', async () => {
    const authors = await normalizeAuthors(['https://example.org', 'https://example.com']);
    expect(authors).toEqual([exampleJSON, 'https://example.com']);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith('https://example.org');
    expect(fetchMock).toHaveBeenCalledWith('https://example.com');
  });

  it('correctly handles an already normalized author', async () => {
    const authors = await normalizeAuthors(exampleJSON);
    expect(authors).toEqual(exampleJSON);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});