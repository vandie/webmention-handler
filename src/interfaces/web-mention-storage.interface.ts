import { Mention } from "../types/mention.type";
import { SimpleMention } from "../types/simple-mention.type";

export interface IWebMentionStorage {
  addPendingMention(mention: SimpleMention): Promise<SimpleMention>;
  getNextPendingMentions(): Promise<SimpleMention[]>;
  getMentionsForPage(page: string, type?: string): Promise<Mention[]>;
  storeMentionForPage(page: string, mention: Mention): Promise<Mention>;
  deleteMention(mention: SimpleMention): Promise<null>;
}