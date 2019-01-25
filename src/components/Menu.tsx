import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'

interface Pages {
  node: {
    path: string
  }
}
type MenuRenderer = (data: Pages[]) => React.ReactNode

export const WithPages: React.SFC<{
  render: MenuRenderer
}> = ({ render }) => (
  <StaticQuery
    render={data => render(data.pages.edges)}
    query={graphql`
      {
        pages: allSitePage(
          filter: { componentPath: { glob: "**/pages/!(404.tsx|index.tsx|contact-*.tsx)" } }
        ) {
          edges {
            node {
              path
            }
          }
        }
      }
    `}
  />
)
