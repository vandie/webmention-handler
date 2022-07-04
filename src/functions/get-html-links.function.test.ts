import { getHtmlLinks } from "./get-html-links.function";
import { parse as htmlParser } from 'node-html-parser';

describe('getHtmlLinks', () => {
  it('correctly grabs all links in a html document', () => {
    const html = htmlParser(`<html><body>
      <div>
      <section id="example"><p>this is a <a href="http://example.com">link</a></p></section>
      <a href="http://example.com/link2">link2</a>
      </div>
      <img href="http://example.com/link3">link3</img>
      <video src="http://example.com/link4" />
      <a>Invalid a tag</a>
      </body></html>`);

    expect(getHtmlLinks(html)).toEqual([
      'http://example.com',
      'http://example.com/link2',
      'http://example.com/link3',
      'http://example.com/link4'
    ])
  });

  it('returns an empty array if no valid links are found', () => {
    const html = htmlParser(`<html><body>
    <div>
    <section id="example"><p>this is no link</p></section>
    <button href="http://example.com/link2">link2</button>
    </div>
    <span>link3</span>
    <a>Invalid a tag</a>
    </body></html>`);
    expect(getHtmlLinks(html)).toEqual([])
  });
})