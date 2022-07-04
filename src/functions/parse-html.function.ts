import { mf2 } from "microformats-parser";
import { MicroformatRoot } from "microformats-parser/dist/types";
import { getHtmlLinks } from "./get-html-links.function";

export function parseHtml(html: string, source: string): MicroformatRoot[] {
  const mf = mf2(html, { baseUrl: source})
  const urls = getHtmlLinks(html);
  if(urls.length > 0) mf.items.push({
    type: ["h-mention-of"],
    properties: {
      'mention-of': urls
    }
  });
  return mf.items;
}