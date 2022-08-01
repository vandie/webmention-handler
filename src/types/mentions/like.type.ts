import { Mention } from "../mention.type";

export type Like = Mention & {
  'type': 'like'
  'like-of': string | string[];
}