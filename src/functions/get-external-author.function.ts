import { fetchHtml } from "./fetch-html.function";
import { parse as htmlParser } from 'node-html-parser';
import { mf2 } from "microformats-parser";
import { normalizeEntry } from "./normalize-entry.function";

export async function getExternalAuthor(url: string): Promise<any> {
  const {html} = await fetchHtml(url);
  if(!html) return false;
  const dom = htmlParser(html);
  const card = dom.querySelector('.h-card');
  if(!card) return false;
  const mf = mf2(card.toString(), { baseUrl: url}).items as any[];
  if(!mf.length) return false;
  return normalizeEntry(mf[0]);
}