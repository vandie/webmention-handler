import { getExternalAuthor } from "./get-external-author.function";

export async function normalizeAuthors(potentialAuthors: any | any[]): Promise<any | any[]> {
  if(!potentialAuthors) return;
  const authors = Array.isArray(potentialAuthors) ? potentialAuthors : [potentialAuthors];
  const authorList = await Promise.all(authors.map(async (a: any) => {
    if(typeof a !== "string") return a;
    const author = await getExternalAuthor(a);
    return author || a; // If the page doesn't have an author object on it, then the url is better than nothing
  }));
  return authorList.length > 1 ? authorList : authorList[0];
}