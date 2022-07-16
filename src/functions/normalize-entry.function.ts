export function normalizeEntry(entry: any) {
  for(let key of Object.keys(entry)) {
    if(Array.isArray(entry[key]) && entry[key].length === 1) {
      entry[key] = entry[key][0];
    }
    if(typeof entry[key] === 'object' && !Array.isArray(entry[key])){
      entry[key] = normalizeEntry(entry[key]);
    }
    if(key === 'properties') {
      Object.assign(entry, entry.properties)
      delete entry.properties;
    }
    if(key === 'content' && typeof entry[key] === 'string') {
      entry['content'] = {
        html: entry['content'],
        value: entry['content']
      }
    }
  }
  return entry;
}