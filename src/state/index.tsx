import * as React from 'react'
import { noop } from 'lodash'

export function persistLanguage(code: string): void {
  window.localStorage.setItem('7b_lang', code)
}

export function getLanguage(): string {
  try {
    return window.localStorage.getItem('7b_lang') || 'pt'
  } catch (err) {
    return 'pt'
  }
}

export const Language = React.createContext({
  languages: ['pt'],
  selected: getLanguage(),
  setLanguage: persistLanguage,
  translate: noop as (key: string) => string
})
