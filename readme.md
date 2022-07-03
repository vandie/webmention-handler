# webmention-handler
`webmention-handler` is a nodejs handler for the 2017 W3C Recomendation Spec of [webmentions](https://www.w3.org/TR/webmention/). Written in TypesScript and including full type definitions.

## instilation
Install with npm
```bash
npm install webmention-handler --save
```
## Setup
To begin with, you should create a webmention storage instance. While there is a default implementation, this implementation is not fit for production environments and is included for explanation purposes only. To create instance of the example storage class, the following code can be used. 
```typescript
import { localWebMentionStorage } from 'webmention-handler';

const storage = new LocalWebMentionStorage();
```
Different storage implementations may take different parameters so please read the documentation for the chosen implementation. With that, however, you can create an instance of your the webmention handler. that can be done like so:
```typescript
import { WebMentionHandler } from 'webmention-handler';

const options = {
  storageHandler: storage, // pass in your storage handler instance
  requiredProtocol: 'https' // Not required, but highly recommended to only allow https mentions
};
export const webMentionHandler = new WebMentionHandler(options)
```

## Usage
Example Express Endpoint
```typescript
//Regular express setup
import express from 'express';
import bodyParser from 'body-parser';
import webMentionHandler from 'path/to/your/webMentionHandler/file.ts';

const app = express();
// Web Mentions require the ability to parse Form encoded data from a post request.
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webmentions', async function(req, res) {
  try {
    // Pass the source and target of the request to the handler.
    // No need to run validation on it as this will be validated by the handler.
    const recomendedResponse = await webMentionHandler.addPendingMention(req.body.source, req.body.target);
    // The response code is dictated by the specification but not enforced by the handler
    // in case you need to action your own out-of-spec actions. response body should be human-readable
    res.status(recomendResponse.code).send('accepted');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// open your express server
app.listen(8080);
```
You should then run the following function on a cron/timed-lambda. It will convert pending mentionNotifications into mention objects in your database that you can use.
```typescript
import webMentionHandler from 'path/to/your/webMentionHandler/file.ts';

await webMentionHandler.processPendingMentions();
```

You can now use your mentions by grabbing the type of mention that you need for a given page.
```typescript
import webMentionHandler from 'path/to/your/webMentionHandler/file.ts';

const likes = webMentionHandler.getMentionsForPage('/blog/example-post', 'likes');
const comments = webMentionHandler.getMentionsForPage('/blog/example-post', 'commments');
```


## Writing Custom Storage Handlers
An example storage handler can be found in the [local storage class](./src/classes/local-web-mention-storage.class.ts). It implements the [IWebMentionStorage](./src/interfaces/web-mention-storage.interface.ts) as any other storage handler should also. This ensures compatibility between storage handlers and allows users to switch between different storage handlers at will without updating the rest of their codebase.

### Functions
The following functions must be implemented in your storage handler class if you are not using TypesScript.
| Function | arguments | returns | async | explanation |
| -------- | --------- | ------- | ----- | ----------- |
| `addPendingMention` | mention: [QueuedMention](./src/types/queued-mention.type.ts) | [QueuedMention](./src/types/queued-mention.type.ts) | `true` | Allows the web mention handler to add a new pending mention that needs to be handled |
| `getNextPendingMentions` | N/A | [QueuedMention](./src/types/queued-mention.type.ts)[] | `true` | Fetches a number of pending mentions to be bulk processed. Any configured limits on the number of pending mentions to fetch should be set in the constructor via an options object rather than passed in to this function directly. |
| `getMentionsForPage` | page: `string`, type?: `string` | [Mention](./src/types/mention.type.ts)[] | `true` | Gets mentions based on a given page key. Has an optional `type` parameter that allows mentions to be filtered on type. eg. Only Comments or Likes` |
| `storeMentionForPage` | page: `string`, mention: [Mention](./src/types/mention.type.ts) | [Mention](./src/types/mention.type.ts) | `true` | This function will store a mention on the given page key. If you need to access the type of the mention, you can find that on the `mention.type` property. |