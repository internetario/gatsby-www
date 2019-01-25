import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Language } from 'src/state'

interface Service {
  node: {
    lang: string
    data: {
      title: {
        text: string
      }
      description: {
        html: string
      }
      examples: {
        example_tag: string
      }[]
    }
  }
}
type ServicesRenderer = (data: Service[]) => React.ReactNode

export const WithServices: React.SFC<{
  render: ServicesRenderer
}> = ({ render }) => (
  <Language.Consumer>
    {({ selected = '' }) => (
      <StaticQuery
        render={data =>
          render(
            data.services.edges.filter(
              (edge: Service) => edge.node.lang.toLowerCase().indexOf(selected.toLowerCase()) >= 0
            )
          )
        }
        query={graphql`
          {
            services: allPrismicService {
              edges {
                node {
                  lang
                  data {
                    title {
                      text
                    }
                    description {
                      html
                    }
                    examples {
                      example_tag
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
