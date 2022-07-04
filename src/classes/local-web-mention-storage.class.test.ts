import { LocalWebMentionStorage } from './local-web-mention-storage.class';
let localWebMentionStorage: LocalWebMentionStorage;
describe('LocalWebMentionStorage', () => {
  beforeEach(() => {
    localWebMentionStorage = new LocalWebMentionStorage();
  });

  describe('addPendingMention', () => {
    it('correctly adds a pending mention', async () => {
      expect([...(localWebMentionStorage as any).queue]).toEqual([]);
      await localWebMentionStorage.addPendingMention({
        source: 'http://example.com/example',
        target: 'http://example.org/example'
      });
      expect([...(localWebMentionStorage as any).queue]).toEqual([{
        source: 'http://example.com/example',
        target: 'http://example.org/example'
      }]);
    });
  });

  describe('getNextPendingMentions', () => {
    it('should return all pending mentions when called', async () => {
      for(let i = 0; i < 10; i++) {
        localWebMentionStorage.addPendingMention({
          source: `http://example.com/example/${i}`,
          target: 'http://example.org/example'
        });
      }
      expect((localWebMentionStorage as any).queue.size).toEqual(10);
      const mentions = await localWebMentionStorage.getNextPendingMentions();
      expect((localWebMentionStorage as any).queue.size).toEqual(0);
      expect(mentions.length).toEqual(10);
      for(let i = 0; i < 10; i++) {
        expect(mentions[i]).toEqual({
          source: `http://example.com/example/${i}`,
          target: 'http://example.org/example'
        });
      }
    });
  });
});