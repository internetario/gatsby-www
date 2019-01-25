import * as React from 'react'
import Button from '@material-ui/core/Button'

import IndexLayout from 'src/layouts'
import { Logo } from 'src/components/Logo'
import { graphql } from 'gatsby'
import { WithPages } from 'src/components/Menu'

import {
  Background,
  CenteralizerContainer,
  IndexSection,
  LogoDecoration
} from '../components/Layout'
import { Back } from 'src/components/navigation/Back'

const IndexPage: React.SFC<{
  data: { site: { siteMetadata: { title: string; description: string } } }
}> = ({ data }) => (
  <Background>
    <IndexLayout>
      <CenteralizerContainer>
        <IndexSection style={{ textAlign: 'center' }}>
          <Logo />
        </IndexSection>

        <IndexSection>
          <Back />
        </IndexSection>
      </CenteralizerContainer>
    </IndexLayout>
  </Background>
)

export const query = graphql`
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
`

export default IndexPage
