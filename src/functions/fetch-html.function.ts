import fetch from 'cross-fetch';

export async function fetchHtml (url: string): Promise<string | false> {
  try {
    const options = {};
    return await fetch(url, options).then(res => res.text());
  } catch (e) {
    return false;
  }
}