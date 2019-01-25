import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Language } from 'src/state'

interface Project {
  node: {
    lang: string
    data: {
      customer: string
      title: {
        text: string
      }
      featured_image: {
        alt: string
        url: string
      }
      content: {
        html: string
      }
    }
  }
}
type ProjectsRenderer = (data: Project[]) => React.ReactNode

export const WithProjects: React.SFC<{
  render: ProjectsRenderer
}> = ({ render }) => (
  <Language.Consumer>
    {({ selected = '' }) => (
      <StaticQuery
        render={data =>
          render(
            data.projects.edges.filter(
              (edge: Project) => edge.node.lang.toLowerCase().indexOf(selected.toLowerCase()) >= 0
            )
          )
        }
        query={graphql`
          {
            projects: allPrismicProject {
              edges {
                node {
                  lang
                  data {
                    customer
                    title {
                      text
                    }
                    featured_image {
                      alt
                      url
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
