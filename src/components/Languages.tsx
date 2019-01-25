import * as React from 'react'

import { navigate } from 'gatsby'
import { Language } from 'src/state'

export const PageLanguageFlags: React.SFC<{ alt_lang_route?: string }> = props => (
  <Language.Consumer>
    {language => (
      <>
        {language.languages.map(code => (
          <a
            key={code}
            className="raised flag"
            title={language.translate(
              (code || '').toLowerCase() === 'pt' ? 'Português' : 'English'
            )}
            onClick={() => (
              language.setLanguage(code), props.alt_lang_route && navigate(props.alt_lang_route)
            )}
            style={{
              display: code === language.selected ? 'none' : undefined,
              letterSpacing: '-0.8px'
            }}
          >
            {(code || '').toLowerCase() === 'pt' ? 'Português' : 'English'}
          </a>
        ))}
      </>
    )}
  </Language.Consumer>
)
