import { Author } from "./author.type"

export type Citation = {
  type : "h-cite",
  author?: Author,
  url: string,
  content?: {
    value: string,
    html?: string
  }
}