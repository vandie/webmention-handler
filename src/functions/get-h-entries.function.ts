import { mf2 } from "microformats-parser";
import { MicroformatRoot } from 'microformats-parser/dist/types';
import type { HTMLElement } from 'node-html-parser';

export function getHEntries(dom: HTMLElement, source: string) {
  const hEntries = dom.querySelectorAll('.h-entry');
  return hEntries.reduce((entries, entry) => {
    return [
      ...entries,
      ...mf2(entry.toString(), { baseUrl: source}).items
    ]
  }, [] as MicroformatRoot[]);
}