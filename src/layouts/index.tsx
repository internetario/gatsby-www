import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import '../styles/styles.scss'

import { Language, persistLanguage, getLanguage } from '../state'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

interface SiteMetadata {
  siteMetadata: {
    title: string
    description: string
  }
}

interface LanguageQuery {
  edges: {
    node: {
      lang: string
      dataString: string
    }
  }[]
}

type StaticQueryProps = {
  site: SiteMetadata
  languages: LanguageQuery
}

class Index extends React.Component<{ site: SiteMetadata }> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { site, children } = this.props
    return (
      <>
        <Helmet
          title={site.siteMetadata.title}
          meta={[
            { name: 'description', content: site.siteMetadata.description },
            { name: 'keywords', content: 'UX Design, UI Design, Startup' },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
            },
            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'theme-color', content: '#0d3f69' },
            {
              name: 'google-site-verification',
              content: 'tyqIB9AYeYgUsJ6f8vuhpeV2X4O7izAY730nI7WogsI'
            },

            { property: 'og:url', content: 'http://7bits.cc/' },
            {
              property: 'og:title',
              content: '7bits | Especialista em UX/UI Design'
            },
            {
              property: 'og:description',
              content:
                'Na 7bits, nós criamos valor através do design. Fazemos entrevistas, protótipos, testes de usabilidade, sempre com o objetivo de criar a melhor experiência.'
            },
            { property: 'og:image', content: 'http://i.imgur.com/35iCAFV.png' }
          ]}
        />
        {children}
      </>
    )
  }
}

interface Dictionaries {
  [lang: string]: {
    [key: string]: string
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
    return languages.edges.reduce(
      (map, { node: { lang, dataString } }) =>
        Object.assign(map, {
          [IndexProvider.languageCode(lang)]: JSON.parse(dataString)
        }),
      {}
    )
  }

  state = IndexLayoutInitialState()

  public componentDidMount() {
    this.updateData()
  }

  public componentDidUpdate() {
    this.updateData()
  }

  public render() {
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
          <Index site={this.props.site}>{this.props.children}</Index>
        </Language.Provider>
      )
    }

    return <Index site={this.props.site}>{this.props.children}</Index>
  }

  private translate = (key: string): string => {
    const dictionaries = this.dictionary
    const language = this.state.language.value
    if (!dictionaries) return ''
    const current = dictionaries[language]
    if (!current) return ''
    return current[key] || key
  }

  private update(value: string) {
    this.setState({
      language: { value, loading: Boolean(this.dictionary[value]) }
    })
  }

  private setLanguage = (value: string) => {
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

const systemFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
]

const Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#444',
      main: '#eee',
      dark: '#eee',
      contrastText: '#000'
    }
  },
  shape: {
    borderRadius: 0
  },
  overrides: {
    MuiChip: {
      root: {
        borderRadius: 0
      }
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['Montserrat', ...systemFonts].join(','),
    body2: {
      fontSize: '1em'
    }
  }
})

class IndexLayout extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <StaticQuery
          render={data => (
            <IndexProvider site={data.site} languages={data.languages} {...this.props} />
          )}
          query={graphql`
            {
              site {
                siteMetadata {
                  title
                  description
                }
              }
              languages: allPrismicDictionary {
                edges {
                  node {
                    lang
                    dataString
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
