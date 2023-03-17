import fs from 'fs/promises'
import Link from 'next/link'
import Image from 'next/image'
import PageLayout from '../components/PageLayout'
import { useI18n } from '../context/i18n'

export default function Home({ latestComics }) {
  const { t } = useI18n()

  return (
    <PageLayout title={t('SEO_TITLE')}>
      <main>
        <h2 className='text-3xl font-bold text-center mb-4'>{t('LATEST_COMICS')}</h2>
        <section className='grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3'>
          {
            latestComics.map(comic => {
              return (
                <Link href={`/comic/${comic.id}`} key={comic.id}>
                  <div className='mb-4 pb-4 m-auto'>
                    <h3 className='font-bold text-sm text-center'>{comic.title}</h3>
                    <Image styles={{ 'objectFit': 'contain' }} width={comic.width} height={comic.height} src={comic.img} alt={comic.alt}/>
                  </div>
                </Link>
              )
            })
          }
        </section>
      </main>
    </PageLayout>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics
    }
  }
}
