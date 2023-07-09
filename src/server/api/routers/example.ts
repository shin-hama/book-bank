import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { findBook } from '~/server/lib/findBok'

const Book = z.object({
  book_id: z.string(),
  title: z.string(),
  read_at: z.date(),
  status_name: z.string(),
  item: z.object({
    pages: z.number(),
    EAN: z.string(),
  }),
})
type Book = z.infer<typeof Book>
const BooksResponse = z.object({
  user: z.object({
    user_id: z.string(),
    account: z.string(),
  }),
  books: z.array(Book),
})
type BooksResponse = z.infer<typeof BooksResponse>

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    }
  }),
  books: publicProcedure
    .input(
      z.object({
        userName: z.string(),
      })
    )
    .query(async ({ input }) => {
      const result = await getAllBooks(input.userName)
      await findBook(result[0]?.title || '')
      return { books: result }
    }),
})

const getBooks = async (userName = 'coppla', page = 0) => {
  // const result = await fetch(`http://api.booklog.jp/v2/json/${userName}?count=10000`)
  const result = await fetch(
    `https://booklog.jp/users/${userName}/all?category_id=all&status=all&sort=sort_desc&rank=all&tag=&page=${page}&keyword=&reviewed=&quoted=&json=true`
  )

  return (await result.json()) as BooksResponse
}

const getAllBooks = async (userName: string, page = 1): Promise<Array<Book>> => {
  const { books } = await getBooks(userName, page)
  if (books.length === 0) {
    return books
  } else {
    return [...books, ...(await getAllBooks(userName, page + 1))]
  }
}
