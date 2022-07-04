import { Mention } from "../types/mention.type";
import { QueuedMention } from "../types/queued-mention.type";
import { SuggestedResponse } from "../types/suggested-response.type";
import { WebMentionOptions } from "../types/web-mention-options.type";

export interface IWebMentionHandler extends WebMentionOptions{
  processMention(mention: QueuedMention): Promise<Mention[] | null>;
  processPendingMentions(): Promise<Mention[]>;
  addPendingMention(source: string, target: string): Promise<SuggestedResponse>;
  getMentionsForPage(page: string, type?: string): Promise<Mention[]>;
}