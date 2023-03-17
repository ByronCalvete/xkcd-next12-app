import { NextUIProvider } from '@nextui-org/react'
import { I18nProvider } from '../context/i18n'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <I18nProvider>
        <Component {...pageProps} />
      </I18nProvider>
    </NextUIProvider>
  )
}

export default MyApp
