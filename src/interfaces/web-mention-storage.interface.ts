import { Mention } from "../types/mention.type";
import { QueuedMention } from "../types/queued-mention.type";

export interface IWebMentionStorage {
  addPendingMention(mention: QueuedMention): Promise<QueuedMention>;
  getNextPendingMentions(): Promise<QueuedMention[]>;
  getMentionsForPage(page: string, type?: string): Promise<Mention[]>;
  storeMentionForPage(page: string, mention: Mention): Promise<Mention>;
  deleteMention(mention: QueuedMention): Promise<null>;
}