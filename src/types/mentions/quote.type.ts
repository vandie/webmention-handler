import { Mention } from "../mention.type";
import { Citation } from "./citation.type";

export type Quote = Mention & {
  'type': 'quote'
  'quotation-of': Citation | string
  'content': {
    html?: string;
    value: string;
  }
}