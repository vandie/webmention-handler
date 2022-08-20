import { Mention } from "../mention.type";

export type Repost = Mention & {
  'type': 'repost'
  'repost-of': string | string[];
}