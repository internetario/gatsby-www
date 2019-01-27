import * as React from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'
import Button from '@material-ui/core/Button'
import { Language } from 'src/state'

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

export const Menu: React.SFC = () => (
  <Language.Consumer>
    {({ translate }) => (
      <WithPages
        render={pages =>
          pages.map(page => (
            <Button
              style={{ marginRight: '1em', marginBottom: '1em' }}
              key={page.node.path}
              variant="outlined"
              onClick={() => navigate(page.node.path)}
            >
              {translate(page.node.path.replace(/[/]/g, ''))}
            </Button>
          ))
        }
      />
    )}
  </Language.Consumer>
)
