import { Mention } from "@app/types/mention.type";
import { QueuedMention } from "@app/types/queued-mention.type";
import { SuggestedResponse } from "@app/types/suggested-response.type";
import { WebMentionOptions } from "@app/types/web-mention-options.type";

export interface IWebMentionHandler extends WebMentionOptions{
  processMention(mention: QueuedMention): Promise<Mention[] | null>;
  processPendingMentions(): Promise<Mention[]>;
  addPendingMention(source: string, target: string): Promise<SuggestedResponse>;
  getMentionsForPage(page: string, type?: string): Promise<Mention[]>;
}