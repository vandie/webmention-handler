import { IWebMentionStorage } from "@app/interfaces/web-mention-storage.interface"

export type WebMentionOptions = {
  requiredProtocol?: string;
  storageHandler?: IWebMentionStorage;
  whitelist?: string[];
  blacklist?: string[];
  supportedHosts: string[];
}