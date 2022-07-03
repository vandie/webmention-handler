import { IWebMentionStorage } from "@app/interfaces/web-mention-storage.interface";
import { Mention } from "@app/types/mention.type";
import { QueuedMention } from "@app/types/queued-mention.type";

export class LocalWebMentionStorage implements IWebMentionStorage {
  private queue: QueuedMention[];
  private pages: {[page: string]: Mention[]}

  constructor() {
    this.queue = [];
    this.pages = {};
  }

  async addPendingMention(mention: QueuedMention): Promise<QueuedMention> {
    this.queue.push(mention);
    return this.queue[this.queue.length - 1];
  }

  async getNextPendingMentions() {
    const q = this.queue;
    this.queue = [];
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
    this.pages[page].push(mention);
    return mention;
  }
}