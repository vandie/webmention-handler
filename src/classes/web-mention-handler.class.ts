import { convertHEntryToMention } from "../functions/convert-h-entry-to-mention";
import { fetchHtml } from "../functions/fetch-html.function";
import { isUrl } from "../functions/is-url.function";
import { parseHtml } from "../functions/parse-html.function";
import { IWebMentionHandler } from "../interfaces/web-mention-handler.interface";
import { IWebMentionStorage } from "../interfaces/web-mention-storage.interface";
import { Mention } from "../types/mention.type";
import { SimpleMention } from "../types/simple-mention.type";
import { SuggestedResponse } from "../types/suggested-response.type";
import { WebMentionOptions } from "../types/web-mention-options.type";
import { LocalWebMentionStorage } from "./local-web-mention-storage.class";

export class WebMentionHandler implements IWebMentionHandler{
  storageHandler: IWebMentionStorage;
  supportedHosts: string[]
  requiredProtocol?: string;
  whitelist?: string[];
  blacklist?: string[];
  stripQueryParameters: boolean;
  
  constructor(options: WebMentionOptions) {
    if(!options?.storageHandler) options.storageHandler = new LocalWebMentionStorage();
    this.storageHandler = options.storageHandler;
    this.supportedHosts = options.supportedHosts;
    this.requiredProtocol = options.requiredProtocol;
    this.whitelist = options.whitelist;
    this.blacklist = options.blacklist;
    this.stripQueryParameters = options.stripQueryParameters || false;
  }

  /**
   * Adds a new pending web mention to be handled
   */
  async addPendingMention(source: string, target: string): Promise<SuggestedResponse> {
    if(!isUrl(source)) throw new Error('Source must be a valid Url');
    if(!isUrl(target)) throw new Error('Target must be a valid Url');

    const sourceUrl = new URL(source);
    const targetUrl = new URL(target);

    /** Optional support for white/blacklisted domains */
    if(this.whitelist && !this.whitelist.includes(sourceUrl.host)) throw new Error('Source is not on whitelist.');
    if(this.blacklist && this.blacklist.includes(sourceUrl.host)) throw new Error('Source is not on whitelist.');

    /** Stops mentions of urls that are not under your control */
    if(!this.supportedHosts.includes(targetUrl.host)) throw new Error('Unsupported Target');

    // Acording to the spec, you can require a given protocol for urls (Recomendation is https)
    if(this.requiredProtocol && sourceUrl.protocol !== this.requiredProtocol+':'){
      throw new Error(`Given source url was not using "${this.requiredProtocol}"`);
    }

    if(this.requiredProtocol && targetUrl.protocol !== this.requiredProtocol+':'){
      throw new Error(`Given target url was not using "${this.requiredProtocol}"`);
    }
    
    // The spec indicates that we should not allow the source URL to be the same as the target.
    // The following code will only check the host and the pathname as query parameters can change
    // for any number of reasons (cach busting for example) and does indicate a separate url.
    // A site will also often be available via multiple different protocols (eg. http and https).
    if(sourceUrl.host === targetUrl.host && sourceUrl.pathname === targetUrl.pathname) {
      throw new Error("The target URL must be the same as the source URL");
    }

    // Acording to the spec target Url fragment identifiers are to be ignored but not source urls
    targetUrl.hash = '';

    if(this.stripQueryParameters) targetUrl.search = '';
    
    // TODO: add support for returning a mention status url
    // hence the currently unused queued object
    const queued = await this.storageHandler.addPendingMention({
      source: sourceUrl.toString(),
      target: targetUrl.toString()
    });
    return {
      code: 202 // in the event that a status url is returned, we will need to return 201 as per the spec
    }
  }

  /**
   * Converts a pending webmention to a set of parsed webmentions by fetching the information from the source
   * server
   */
  async processMention(mention: SimpleMention): Promise<Mention[] | null> {
    const {html, status, error} = await fetchHtml(mention.source);
    // Delete exisiting webmentions with the current source and target to avoid duplication
    await this.storageHandler.deleteMention(mention);
    // A status of 410 indicates that the webmention that previously existed was deleted
    // If we got an error or there was no html body, then the source is invalid and
    // we should delete any stored version of the webmention as per the specification without
    // adding new ones
    if(error || !html || status === 410) return null;
    const hEntries = parseHtml(html, mention.source, mention.target);
    let mentionedUrls = hEntries.find(({type}) => type && type.includes("mention-of"));
    // If the page does not include any mention of the target, then we can return
    // early as we have already deleted any stored mentions with this target and source
    if(!mentionedUrls) return null;

    let mentions = hEntries.map(h => convertHEntryToMention(h, mention.source, mention.target));
    // if there are only basic mentions, use the first (most complete mention)
    // otherwsise, get rid of any basic mentions as we have a better type
    if(mentions.find(m => m.type !== 'mention')) mentions = mentions.filter(m => m.type !== 'mention');
    else mentions = [mentions.find(m => m.type === 'mention')!];
    const storedMentions = mentions.map(m => this.storageHandler.storeMentionForPage(m.target, m));
    return Promise.all(storedMentions);
  }

  /**
   * Calls processMention on a collection of pending webmentions
   */
  async processPendingMentions(): Promise<Mention[]> {
    const mentions = await this.storageHandler.getNextPendingMentions();
    const validateMentions = await Promise.all(mentions.map(mention => this.processMention(mention)));
    const filteredBadResponses = validateMentions.filter(Boolean as any) as Mention[][];
    const flattened = filteredBadResponses.reduce((acc, mentions) => [...acc, ...mentions], [] as Mention[]);
    return flattened;
  }

  /**
   * Grabs a list of parsed webmentions for a given page. Optionally filter by mention type.
   */
  getMentionsForPage(page: string, type?: string | undefined): Promise<Mention[]> {
    return this.storageHandler.getMentionsForPage(page, type);
  }
}