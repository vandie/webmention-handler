import { parse as htmlParser } from 'node-html-parser';

export function getHtmlLinks(html: string):string[] {
  const dom = htmlParser(html);
  // We only care about valid A tags as we want the linked urls
  const aTags = dom.querySelectorAll('a[href]');
  return aTags.map(tag => tag.attributes.href);
}