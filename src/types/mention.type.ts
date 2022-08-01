import { Author } from "./mentions/author.type";

export type Mention = {
  type: string;
  target: string;
  source: string;
  parsed: Date;
  'author'?: Author
  [key: string]: any;
}