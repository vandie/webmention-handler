import fetch from 'cross-fetch';

export async function fetchHtml (url: string): Promise<{status?: number; html?: string, error?: string}> {
  try {
    const options = {};
    const res = await fetch(url, options);
    return {
      status: res.status,
      html: await res.text()
    }
  } catch (e: any) {
    return {
      error: e.message,
    }
  }
}