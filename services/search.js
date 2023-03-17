import algoliasearch from "algoliasearch/lite"

const client = algoliasearch('7BCVZDH1JE', 'e807c26225aaa0603964f36c84e10516')
const index = client.initIndex('xkcd')

const CACHE = {}

export const search = async ({ query }) => {
  if (CACHE[query]) {
    return { results: CACHE[query] }
  }

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'alt', 'img', 'title'],
    hitsPerPage: 10
  })

  CACHE[query] = hits

  return { results: hits }
}
