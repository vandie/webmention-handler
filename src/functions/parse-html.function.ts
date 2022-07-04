import { parse as htmlParser } from 'node-html-parser';
import { MicroformatRoot } from "microformats-parser/dist/types";
import { getHEntries } from "./get-h-entries.function";
import { getHtmlLinks } from "./get-html-links.function";

export function parseHtml(html: string, source: string): MicroformatRoot[] {
  const dom = htmlParser(html);
  const urls = getHtmlLinks(dom);
  const items = getHEntries(dom, source);
  if(urls.length > 0) items.push({
    type: ["h-mention-of"],
    properties: {
      'mention-of': urls
    }
  });
  return items;
}