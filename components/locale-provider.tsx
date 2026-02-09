"use client"

import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from "react"
import { type Locale, type Dictionary, dictionaries, I18nProvider } from "@/lib/i18n"

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
})

export function useLocale() {
  return useContext(LocaleContext)
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")
  const [dict, setDict] = useState<Dictionary>(dictionaries.en)

  useEffect(() => {
    const saved = localStorage.getItem("bienzoli-locale") as Locale | null
    if (saved && dictionaries[saved]) {
      setLocaleState(saved)
      setDict(dictionaries[saved])
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    setDict(dictionaries[l])
    localStorage.setItem("bienzoli-locale", l)
  }, [])

  return (
    <LocaleContext value={{ locale, setLocale }}>
      <I18nProvider value={dict}>{children}</I18nProvider>
    </LocaleContext>
  )
}
