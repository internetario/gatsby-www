import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'

interface Image {
  width: number
  height: number
  src: string
}
type ImageRenderer = (data: Image) => React.ReactNode

export const WithLogo: React.SFC<{
  render: ImageRenderer
}> = ({ render }) => (
  <StaticQuery
    render={data => render(data.logo.childImageSharp.fixed)}
    query={graphql`
      {
        logo: file(relativePath: { glob: "**/irio.png" }) {
          childImageSharp {
            fixed(width: 150) {
              width
              height
              src
            }
          }
        }
      }
    `}
  />
)

export const Logo = ({ text = 'Internetario' }) => (
  <h1
    style={{
      fontFamily: 'Cutive Mono, monospace',
      boxShadow: 'black -28px -16px 0px -1px, white -28px -16px 0px 0px',
      lineHeight: '50px',
      fontSize: '32px',
      display: 'inline-block',
      height: 50,
      width: 'auto'
    }}
  >
    {text}
  </h1>
)
