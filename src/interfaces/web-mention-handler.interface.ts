import { Mention } from "../types/mention.type";
import { SimpleMention } from "../types/simple-mention.type";
import { SuggestedResponse } from "../types/suggested-response.type";
import { WebMentionOptions } from "../types/web-mention-options.type";

export interface IWebMentionHandler extends WebMentionOptions{
  processMention(mention: SimpleMention): Promise<Mention[] | null>;
  processPendingMentions(): Promise<Mention[]>;
  addPendingMention(source: string, target: string): Promise<SuggestedResponse>;
  getMentionsForPage(page: string, type?: string): Promise<Mention[]>;
}