import Image from 'next/image'
import Link from 'next/link'

import PageLayout from '../../components/PageLayout'

import { basename } from 'node:path'
import { readFile, stat, readdir } from 'node:fs/promises'

export default function Comic ({ img, alt, title, width, height, hasPrevious, hasNext, prevId, nextId }) {
  return (
    <PageLayout title={`Next XKCD - ${title}`}>
      <section className='max-w-lg m-auto'>
        <h1 className='text-center font-bold'>{title}</h1>
        <Image src={img} width={width} height={height} alt={alt}/>
        <p>{alt}</p>
        <div className='flex justify-between mt-4 font-bold'>
          {hasPrevious && <Link className='text-gray-500 ' href={`/comic/${prevId}`}>⬅ Previous</Link>}
          {hasNext && <Link className='text-gray-500' href={`/comic/${nextId}`}>Next ➡</Link>}
        </div>
      </section>
    </PageLayout>
  )
}

export async function getStaticPaths () {
  const files = await readdir('./comics')

  const paths = files.map(file => {
    const id = basename(file, '.json')
    return { params: { id } }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { id } = params

  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId
    }
  }
}