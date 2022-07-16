import { Mention } from "../types/mention.type";

export function convertHEntryToMention(entry: any, source: string, target: string): Mention {
  const mention: Mention = Object.assign({
    source,
    target,
    parsed: new Date()
  }, entry);
  if(mention['like-of']) mention.type = 'like';
  else if(mention['in-reply-to']) mention.type = 'reply';
  else if(mention['repost-of']) mention.type = 'repost';
  else if(mention['quotation-of']) mention.type = 'quote';
  else if(mention['bookmark-of']) mention.type = 'bookmark';

  if(mention.type === 'reply' && mention.rsvp) mention.type = 'rsvp';

  if(mention.type === 'mention-of' || !mention.type) return { ...mention, type: 'mention' };

  return mention;
}