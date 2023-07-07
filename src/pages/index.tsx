import Head from 'next/head'
import Account from './Account'

export default function Home() {
  return (
    <>
      <Head>
        <title>Book Bank</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Account />
      </main>
    </>
  )
}
