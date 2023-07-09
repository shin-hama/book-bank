import { type FC } from 'react'
import { api } from '~/utils/api'

const Account: FC = () => {
  const { data, error } = api.example.books.useQuery(
    { userName: 'coppla' },
    {
      retry: false,
    }
  )

  error && console.error(error)

  if (!data || data.books.length === 0) {
    return <>No books</>
  }

  return (
    <>
      {data.books.map((book) => (
        <p key={book.book_id}>{book.title}</p>
      ))}
    </>
  )
}

export default Account
