import * as React from 'react'

import { graphql, StaticQuery, navigate } from 'gatsby'
import { keyBy } from 'lodash'
import { Language } from '../state'

export const PageLanguageFlags: React.SFC<{ alt_lang_route?: string }> = props => (
  <Language.Consumer>
    {language => (
      <StaticQuery
        render={(data: {
          flags: {
            edges: {
              node: { publicURL: string }
            }[]
          }
        }) => (
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
        query={graphql`
          {
            flags: allFile(filter: { relativePath: { glob: "media/language/**" } }) {
              edges {
                node {
                  publicURL
                  name
                }
              }
            }
          }
        `}
      />
    )}
  </Language.Consumer>
)
