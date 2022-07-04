import type { HTMLElement } from 'node-html-parser';

export function getHtmlLinks(dom: HTMLElement):string[] {
  // We only care about valid A tags as we want the linked urls
  const aTags = dom.querySelectorAll('a[href], img[href]');
  const imgTags = dom.querySelectorAll('img[src], video[src]');
  return [
    ...aTags.map(tag => tag.attributes.href),
    ...imgTags.map(tag => tag.attributes.src)
  ];
}