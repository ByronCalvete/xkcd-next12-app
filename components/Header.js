import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

const Header = () => {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const {locale, locales} = useRouter()

 const getValue = () => searchRef.current?.value

  const handleChange = () => {
    const q = getValue()

    if (!q) return
  
    fetch(`/api/search/?q=${q}`)
      .then(res => res.json())
      .then(searchResults => {
        setResults(searchResults)
      })
  }

  const restOfLocales = locales.filter(l => l !== locale)
  // const showLocales = () => {
  //   const restOfLocales = locales.filter(l => l !== locale)
  //   return {
  //     selectedLocale: locale,
  //     restOfLocales
  //   }
  // }

  return (
    <header className='flex justify-between items-center p-4 max-w-xl m-auto'>
      <h1 className='font-bold'><Link href='/'>next <span className='font-light'>xkcd</span></Link></h1>
      <nav>
        <ul className='flex gap-2'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link className='p-1 rounded-md bg-blue-400 text-white font-bold' href='/' locale={restOfLocales[0]}>
              {restOfLocales[0]}
            </Link>
          </li>
          <li>
            <input ref={searchRef} className='px-4 py-1 border border-gray-400 text-xs rounded-3xl' type='search' onChange={handleChange} />
            <div className='relative'>
              {
                Boolean(results.length) && <div className='absolute top-0 left-0'>
                  <ul className='w-full border rounded-lg border-gray-50 shadow-xl bg-white overflow-hidden'>
                    <li className='m-0' key='all-results'>
                      <Link href={`/search?q=${getValue()}`} className='block px-2 py-1 overflow-hidden text-sm italic front-semibold text-gray-400 hover:bg-slate-200 text-ellipsis whitespace-nowrap'>
                        {`Ver ${results.length} results`}
                      </Link>
                    </li>
                    {results.map(result => {
                      return (
                        <li className='m-0' key={result.id}>
                          <Link href={`/comic/${result.id}`} className='px-2 py-1 text-sm font-semibold hover:bg-slate-200 block'>{result.title}</Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              }
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
