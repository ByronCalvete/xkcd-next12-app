import PageLayout from "../../components/PageLayout"
import Link from 'next/link'
import Image from 'next/image'
import { search } from '../../services/search.js'

const Search = ({ query, results }) => {
  return (
    <PageLayout title={`Next XKCD - Search results ${query}`}>
      <h1 className='text-center'>{`${results.length} Results for ${query}`}</h1>
      {
        results.map(result => {
          return (
            <Link href={`/comic/${result.id}`} key={result.id} className='bg-slate-300 hover:bg-slate-50 flex flex-row content-center justify-start max-w-xl m-auto'>
              <Image src={result.img} width='50' height='50' className='rounded-full' alt={result.alt}/>
              <div>
                <h2>{result.title}</h2>
              </div>
            </Link>
          )
        })
      }
    </PageLayout>
  )
}

export default Search

export async function getServerSideProps (context) {
  const { query } = context
  const { q = '' } = query

  // fetch algolia's api for search the results
  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results
    }
  }
}