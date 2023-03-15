import { Container } from '@nextui-org/react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4 max-w-xl m-auto'>
      <h1 className='font-bold'><Link href='/'>next <span className='font-light'>xkcd</span></Link></h1>
      <nav>
        <ul className='flex gap-2'>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/search'>Search</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
