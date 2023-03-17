import { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import es from '../translations/es.json'
import en from '../translations/en.json'

const I18nContext = createContext()

const languages = { es, en }

export const I18nProvider = ({ children }) => {
  const { locale } = useRouter()
  const t = useCallback((key, ...args) => {
    // switch (locale) {
    //   case 'es':
    //     return es[key]
    //   case 'en':
    //     return en[key]
    //   default:
    //     return en[key]
    // }
    let translation = languages[locale][key]
    if (args.length === 0) return translation
    args.forEach((value, index) => (
      translation = translation.replace(`\${${index}}`, value))
    )

    return translation
  }, [locale])

  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within a I18nProvider')
  }
  return context
}
