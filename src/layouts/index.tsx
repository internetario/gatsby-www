import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import '../styles/styles.scss'

import { Language, persistLanguage, getLanguage } from '../state'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

interface SiteMetadata {
  siteMetadata: {
    title: string
    description: string
  }
}

interface About {
  data: {
    title: {
      text: string
    }
    content: {
      html: string
    }
    meta_description: string
    meta_keywords: string
    cover_picture: {
      url: string
    }
  }
}

type Translations = string | { html: string; text: string }

interface LanguageQuery {
  edges: {
    node: {
      lang: string
      dataString: string
      data: {
        [key: string]: Translations
      }
    }
  }[]
}

type StaticQueryProps = {
  site: SiteMetadata
  about: About
  languages: LanguageQuery
}

class Index extends React.Component<{ site: SiteMetadata; about: About }> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { site, about, children } = this.props
    return (
      <>
        <Helmet
          title={site.siteMetadata.title}
          meta={[
            { name: 'description', content: about.data.meta_description },
            { name: 'keywords', content: about.data.meta_keywords },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
            },
            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'theme-color', content: '#000000' },

            { property: 'og:url', content: 'https://internetario.ga' },
            {
              property: 'og:title',
              content: about.data.title.text
            },
            {
              property: 'og:description',
              content: about.data.meta_description
            },
            { property: 'og:image', content: about.data.cover_picture.url }
          ]}
        />
        {children}
      </>
    )
  }
}

interface Dictionaries {
  [lang: string]: {
    [key: string]: Translations
  }
}

const IndexLayoutInitialState = () => ({
  language: {
    value: getLanguage(),
    loading: true
  }
})

class IndexProvider extends React.Component<
  StaticQueryProps,
  ReturnType<typeof IndexLayoutInitialState>
> {
  get dictionary() {
    return IndexProvider.dictionaries(this.props.languages)
  }
  static languageCode(code: string) {
    return code.split('-')[0]
  }

  static dictionaries(languages: LanguageQuery = { edges: [] }): Dictionaries {
    return languages.edges.reduce((map, { node: { lang, data = {}, dataString } }) => {
      const parsed = JSON.parse(dataString)
      return Object.assign(map, {
        [IndexProvider.languageCode(lang)]: Object.assign(parsed, data)
      })
    }, {})
  }

  state = IndexLayoutInitialState()

  public componentDidMount() {
    this.updateData()
  }

  public componentDidUpdate() {
    this.updateData()
  }

  public render() {
    const indexChild = (
      <Index about={this.props.about} site={this.props.site}>
        {this.props.children}
      </Index>
    )

    if (this.props.languages) {
      return (
        <Language.Provider
          value={{
            languages: Object.keys(this.dictionary),
            selected: this.state.language.value,
            setLanguage: this.setLanguage,
            translate: this.translate
          }}
        >
          {indexChild}
        </Language.Provider>
      )
    }

    return indexChild
  }

  private translate = (key: string, to: 'text' | 'html' = 'text'): string => {
    const dictionaries = this.dictionary
    const language = this.state.language.value
    if (!dictionaries) return ''
    const current = dictionaries[language]
    if (!current) return ''
    const hit = current[key] || key
    return typeof hit === 'object' ? hit[to] : hit
  }

  private update(value: string) {
    this.setState({
      language: { value, loading: Boolean(this.dictionary[value]) }
    })
  }

  private setLanguage = (value: string) => {
    console.log('setLanguage', value)
    const language = IndexProvider.languageCode(value)
    persistLanguage(language)
    this.update(value)
  }

  private updateData() {
    const { value, loading } = this.state.language
    const next_loading = Boolean(this.dictionary[value])

    if (loading !== next_loading) {
      this.update(value)
    }
  }
}

const darkTheme = require('src/themes/dark.json')
const MuiTheme = createMuiTheme(darkTheme)

class IndexLayout extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={MuiTheme}>
        <StaticQuery
          render={data => (
            <IndexProvider
              site={data.site}
              about={data.about}
              languages={data.languages}
              {...this.props}
            />
          )}
          query={graphql`
            {
              site {
                siteMetadata {
                  title
                  description
                }
              }
              about: prismicAbout {
                data {
                  title {
                    text
                  }
                  content {
                    html
                  }
                  meta_description
                  meta_keywords
                  cover_picture {
                    url
                  }
                }
              }
              languages: allPrismicDictionary {
                edges {
                  node {
                    lang
                    dataString
                    data {
                      portfolio_headline {
                        html
                      }
                      be_a_partner_description {
                        html
                      }
                    }
                  }
                }
              }
            }
          `}
        />
      </MuiThemeProvider>
    )
  }
}

export default IndexLayout
