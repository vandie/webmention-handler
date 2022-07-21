import { parse as htmlParser } from 'node-html-parser';
import { MicroformatRoot } from "microformats-parser/dist/types";
import { getHEntries } from "./get-h-entries.function";
import { getHtmlLinks } from "./get-html-links.function";
import { normalizeEntry } from './normalize-entry.function';

export function parseHtml(html: string, source: string, target: string): any[] {
  const dom = htmlParser(html);
  const urls = getHtmlLinks(dom);
  const items = getHEntries(dom, source, target);
  // If the url is mentioned but for some reason there isn't propper
  // microformats data
  if(urls.find(v => v === target)) items.push({
    type: ["mention-of"],
    properties: {
      'mention-of': [ target ]
    }
  });

  // Return a more readable format
  return items.map(normalizeEntry)
}