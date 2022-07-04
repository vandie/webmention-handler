import { mf2 } from "microformats-parser";
import { MicroformatRoot } from 'microformats-parser/dist/types';
import type { HTMLElement } from 'node-html-parser';
import { getHtmlLinks } from "./get-html-links.function";

export function getHEntries(dom: HTMLElement, source: string, target: string): MicroformatRoot[] {
  const hEntries = dom.querySelectorAll('.h-entry');
  return hEntries.reduce((entries, entry) => {
    if(!getHtmlLinks(entry).includes(target)) return entries;
    return [
      ...entries,
      ...mf2(entry.toString(), { baseUrl: source}).items
    ]
  }, [] as MicroformatRoot[]);
}