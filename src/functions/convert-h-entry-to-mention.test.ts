import path from 'path';
import fs from 'fs';
import { parseHtml } from './parse-html.function';
import { convertHEntryToMention } from './convert-h-entry-to-mention';

describe('convertHEntryToMention', () => {
  it('correctly creates a basic reply', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const reply = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(reply).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'reply',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  })

  it('correctly creates an authored reply', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply-with-author.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const reply = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(reply).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'reply',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  })

  it('correctly creates a reply response', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-reply-to-reply.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const reply = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(reply).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'reply',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  })

  it('correctly creates a like', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-like.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const like = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(like).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'like',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  })

  it('correctly creates an rsvp', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-rsvp.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const rsvp = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(rsvp).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'rsvp',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  })

  it('correctly creates a quote', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-quote.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const quote = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(quote).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'quote',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  })

  it('correctly creates a bookmark', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-bookmark.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const bookmark = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(bookmark).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'bookmark',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  })

  it('correctly creates a repost', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-repost.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const repost = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(repost).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'repost',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  })

  it('correctly creates a mention', () => {
    const testHtml = fs.readFileSync(path.join(__dirname, '../test-data/html-mention.html'), 'utf8');
    const hEntries = parseHtml(testHtml, 'http://example.com', 'http://example.com/note123');
    const repost = convertHEntryToMention(hEntries[0], 'http://example.com', 'http://example.com/note123');
    expect(repost).toEqual(expect.objectContaining({
      ...hEntries[0],
      type: 'mention',
      source: 'http://example.com',
      target: 'http://example.com/note123'
    }));
  });
})