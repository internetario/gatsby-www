import * as React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Language } from 'src/state'

interface About {
  lang: string
  data: {
    title: {
      text: string
    }
    content: {
      html: string
    }
  }
}

const AboutSection = (props: { about: About }) => (
  console.log(props.about.data),
  (
    <>
      <h2>{props.about.data.title.text}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.about.data.content.html }} />
    </>
  )
)

export const About: React.SFC = () => (
  <Language.Consumer>
    {({ selected }) => (
      <StaticQuery
        render={(data: { about: { edges: { node: About }[] } }) => {
          console.log(selected)
          const target = data.about.edges.find(
            ({ node }) => node.lang.toLowerCase().indexOf(selected.toLowerCase()) >= 0
          )
          return target ? <AboutSection about={target.node} /> : null
        }}
        query={graphql`
          {
            about: allPrismicAbout {
              edges {
                node {
                  lang
                  data {
                    title {
                      text
                    }
                    content {
                      html
                    }
                  }
                }
              }
            }
          }
        `}
      />
    )}
  </Language.Consumer>
)
