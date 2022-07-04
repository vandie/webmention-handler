import { IWebMentionStorage } from "../interfaces/web-mention-storage.interface";
import { Mention } from "../types/mention.type";
import { QueuedMention } from "../types/queued-mention.type";

export class LocalWebMentionStorage implements IWebMentionStorage {
  private queue: Set<QueuedMention>;
  private pages: {[page: string]: Mention[]}

  constructor() {
    this.queue = new Set<QueuedMention>();
    this.pages = {};
  }

  async addPendingMention(mention: QueuedMention): Promise<QueuedMention> {
    this.queue.add(mention);
    return mention;
  }

  async getNextPendingMentions() {
    const q = [...this.queue];
    this.queue.clear();
    return q;
  }

  async getMentionsForPage(page: string, type?: string | undefined): Promise<Mention[]> {
    if(!this.pages[page]) return [];
    const mentions = this.pages[page];
    if(!type) return mentions;
    else return mentions.filter(m => m.type === type);
  }

  async storeMentionForPage(page: string, mention: Mention): Promise<Mention> {
    if(!this.pages[page]) this.pages[page] = [];
    await this.deleteMention(mention); // delete any old versions of this mention
    this.pages[page].push(mention);
    return mention;
  }

  async deleteMention(mention: QueuedMention): Promise<null> {
    this.pages[mention.target] = this.pages[mention.source].filter(({source}) => source !== mention.source);
    return null;
  }
}