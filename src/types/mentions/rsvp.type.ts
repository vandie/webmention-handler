import { Mention } from "../mention.type";

export type Rsvp = Mention & {
  'type': 'rsvp'
  'in-reply-to': string | string[];
  'content': {
    html?: string;
    value: string;
  }
}