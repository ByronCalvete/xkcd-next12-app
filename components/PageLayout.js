import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const PageLayout = ({ children, title = 'Next XKCD - App' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="name" description="Byron J Calvete" />
        <meta name="description" content="This next App is for fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default PageLayout
