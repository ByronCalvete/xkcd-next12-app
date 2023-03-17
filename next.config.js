/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['imgs.xkcd.com']
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    // domains: [
    //   {
    //     domain: 'xkcd.com',
    //     defaultLocale: 'en'
    //   },
    //   {
    //     domain: 'xkcd.es',
    //     defaultLocale: 'es'
    //   }
    // ]
  }
}

// "/comic/123" -> 'en'
//"/es/comic/123" => 'es'

module.exports = nextConfig
