import fs from 'fs';
import path from 'path';
import { parse as htmlParser } from 'node-html-parser';
import { getHEntries } from './get-h-entries.function';

describe('getHEntries', () => {
  it('should parse replies', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply.html'), 'utf8');
    const dom = htmlParser(testHtml);
    const comment = [{"type":["h-entry"],"properties":{"in-reply-to":["http://example.com/note123"],"name":["Good point! Now what is the next thing we should do?"],"content":["Good point! Now what is the next thing we should do?"]}}];
    expect(getHEntries(dom, 'http://example.com')).toEqual(comment);
  });

  it('should parse replies with an author', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply-with-author.html'), 'utf8');
    const dom = htmlParser(testHtml);
    const comment = [{"properties": {"author": [{"properties": {"name": [""], "photo": ["http://mysite.example.org/icon.jpg"], "url": ["http://mysite.example.org"]}, "type": ["h-card"], "value": ""}], "content": ["Good point! Now what is the next thing we should do?"], "in-reply-to": ["http://example.com/note123"], "name": ["Good point! Now what is the next thing we should do?"]}, "type": ["h-entry"]}];
    expect(getHEntries(dom, 'http://example.com')).toEqual(comment);
  });
})