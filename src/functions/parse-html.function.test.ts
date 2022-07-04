import path from 'path';
import fs from 'fs';
import { parseHtml } from './parse-html.function';

describe('parseMicroformats', () => {
  it('should parse replies', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply.html'), 'utf8');
    const comment = [{"type":["h-entry"],"properties":{"in-reply-to":["http://example.com/note123"],"name":["Good point! Now what is the next thing we should do?"],"content":["Good point! Now what is the next thing we should do?"]}},{"type":["h-mention-of"],"properties":{"mention-of":["http://example.com/note123"]}}];
    expect(parseHtml(testHtml, 'http://example.com')).toEqual(comment);
  });

  it('should parse replies with an author', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply-with-author.html'), 'utf8');
    const comment = [{"properties": {"author": [{"properties": {"name": [""], "photo": ["http://mysite.example.org/icon.jpg"], "url": ["http://mysite.example.org"]}, "type": ["h-card"], "value": ""}], "content": ["Good point! Now what is the next thing we should do?"], "in-reply-to": ["http://example.com/note123"], "name": ["Good point! Now what is the next thing we should do?"]}, "type": ["h-entry"]}, {"properties": {"mention-of": ["http://mysite.example.org", "http://example.com/note123", "http://mysite.example.org/icon.jpg",]}, "type": ["h-mention-of"]}];
    expect(parseHtml(testHtml, 'http://example.com')).toEqual(comment);
  });
})