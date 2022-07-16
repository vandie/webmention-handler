import { normalizeEntry } from "./normalize-entry.function";

describe('normalizeEntry', () => {
  it('normalizes a basic object', () => {
    const entry:any = {
      properties: {
        'name': 'dave',
        'url': 'https://example.com'
      },
      'contributer': ['example'],
      'like-of': 'https://mikevdv.dev/blog/2022-07-05-web-mentions'
    }
    const flat = {
      'name': 'dave',
      'contributer': 'example',
      'url': 'https://example.com',
      'like-of': 'https://mikevdv.dev/blog/2022-07-05-web-mentions'
    };
    expect(normalizeEntry(entry)).toEqual(flat);
  });

  it('normalizes a html content field', () => {
    const entry = {
      content: 'example',
      "like-of": 'https://example.com'
    };
    const normal = {
      content: {
        html: 'example',
        value: 'example'
      },
      "like-of": 'https://example.com'
    }
    expect(normalizeEntry(entry)).toEqual(normal);
  });

  it('normalizes a complex object', () => {
    const entry = {
      properties: {
        contributer: [{
          'name': 'dave',
          'url': ['https://example.com', 'http://example.com/dave']
        }],
        url: 'example.com/path'
      },
      'like-of': 'https://mikevdv.dev/blog/2022-07-05-web-mentions'
    }
    const normal = {
      "contributer": {
        "name": "dave",
        "url": [
          "https://example.com",
          "http://example.com/dave",
        ],
      },
      "like-of": "https://mikevdv.dev/blog/2022-07-05-web-mentions",
      "url": "example.com/path",
    };
    expect(normalizeEntry(entry)).toEqual(normal);
  });
});