import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Language } from 'src/state'

interface WhoAmI {
  lang: string
  data: {
    title: { text: string }
    content: { html: string }
  }
}

const WhyDoIExistSection = (data: { whoAmI: WhoAmI }) => (
  <>
    <h3>{data.whoAmI.data.title.text}</h3>
    <div dangerouslySetInnerHTML={{ __html: data.whoAmI.data.content.html }} />
  </>
)

export const WhyDoIExist: React.SFC = () => (
  <Language.Consumer>
    {({ selected }) => (
      <StaticQuery
        render={(data: { whoAmI: { edges: { node: WhoAmI }[] } }) => {
          const target = data.whoAmI.edges.find(
            ({ node }) => node.lang.toLowerCase().indexOf(selected.toLowerCase()) >= 0
          )
          return target ? <WhyDoIExistSection whoAmI={target.node} /> : null
        }}
        query={graphql`
          {
            whoAmI: allPrismicWhoAmI {
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
