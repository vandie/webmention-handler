import { Mention } from "@app/types/mention.type";
import { isOnlyOneEmoji } from "./is-single-emoji.function";

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
  else if(mention.type === 'reply' && isOnlyOneEmoji(mention.content.value)) mention.type = 'reaction';

  if(mention.type === 'mention-of') return { ...mention, type: 'mention' };

  return mention;
}