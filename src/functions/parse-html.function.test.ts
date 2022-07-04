import path from 'path';
import fs from 'fs';
import { parseHtml } from './parse-html.function';

describe('parseMicroformats', () => {
  it('should parse replies', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply.html'), 'utf8');
    const comment = [{"content": {"html": "Good point! Now what is the next thing we should do?", "value": "Good point! Now what is the next thing we should do?"}, "in-reply-to": "http://example.com/note123", "name": "Good point! Now what is the next thing we should do?", "type": "h-entry"}, {"mention-of": "http://example.com/note123", "type": "mention-of"}];
    expect(parseHtml(testHtml, 'http://example.org', 'http://example.com/note123')).toEqual(comment);
  });

  it('should parse replies with an author', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply-with-author.html'), 'utf8');
    const comment = [{"author": {"name": "", "photo": "http://mysite.example.org/icon.jpg", "type": "h-card", "url": "http://mysite.example.org", "value": ""}, "content": {"html": "Good point! Now what is the next thing we should do?", "value": "Good point! Now what is the next thing we should do?"}, "in-reply-to": "http://example.com/note123", "name": "Good point! Now what is the next thing we should do?", "type": "h-entry"}, {"mention-of": "http://example.com/note123", "type": "mention-of"}];
    expect(parseHtml(testHtml, 'http://mysite.example.org', 'http://example.com/note123')).toEqual(comment);
  });
})