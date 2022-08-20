import { Mention } from "../mention.type";

export type Reply = Mention & {
  'type': 'reply'
  'in-reply-to': string | string[];
  'content': {
    html?: string;
    value: string;
  }
}