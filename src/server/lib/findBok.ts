import Parser from 'rss-parser'

type Book = {
  creator: string
  title: string
  link: string
  author: string
  'dc:creator': string
  content: string
  contentSnippet: string
  guid: string
  categories: [Array]
}
type SearchBooksResponse = {
  items: Array<Book>
  title: string
  link: string
  language: string
}

const searchUrl = (title: string): string => {
  return encodeURI(`https://iss.ndl.go.jp/api/opensearch?cnt=10&title=${title}`)
}

export async function findBook(title: string) {
  const parser = new Parser()
  const results = await parser.parseURL(searchUrl(title.replace(' ', '')))
  console.log(results)
}
