import * as React from 'react'
import { noop } from 'lodash'

const SELECTED_LANG_KEY = 'irio_lang'

export function persistLanguage(code: string): void {
  window.localStorage.setItem(SELECTED_LANG_KEY, code)
}

export function getLanguage(): string {
  try {
    const stored = window.localStorage.getItem(SELECTED_LANG_KEY)
    const parsed = stored ? stored.trim().toLowerCase() : ''
    const valid = ['pt', 'en'].indexOf(parsed) >= 0
    return valid ? parsed : 'pt'
  } catch (err) {
    return 'pt'
  }
}

export const Language = React.createContext({
  languages: ['pt'],
  selected: getLanguage(),
  setLanguage: persistLanguage,
  translate: noop as (key: string, to?: 'text' | 'html') => string
})
