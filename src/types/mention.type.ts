export type Mention = {
  type: string;
  target: string;
  source: string;
  parsed: Date;
  [key: string]: any;
}