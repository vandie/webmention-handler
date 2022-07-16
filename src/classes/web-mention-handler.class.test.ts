import { WebMentionHandler } from "./web-mention-handler.class";

describe('WebmentionHandler', () => {
  it('instanciates correctly with minimal options', () => {
    const webMentionHandler = new WebMentionHandler({supportedHosts: ['localhost']});
    expect(webMentionHandler).toEqual(expect.objectContaining({
      supportedHosts: ['localhost'],
      stripQueryParameters: false
    }))
  });
});