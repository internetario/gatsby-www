import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

import IndexLayout from 'src/layouts'
import { Logo } from 'src/components/Logo'
import { WithPages } from 'src/components/Menu'
import { Language } from 'src/state'
import { WithServices } from 'src/components/Service'
import { PageLanguageFlags } from 'src/components/Languages'
import { GenericContact } from 'src/components/Contact'

import {
  Background,
  IndexCenteralizerContainer,
  IndexSection,
  LogoDecoration,
  CenteralizerContainer
} from '../components/Layout'
import { Back } from 'src/components/navigation/Back'

const IndexPage: React.SFC<{
  data: {
    site: { siteMetadata: { title: string; description: string } }
    whoAmI: { data: { content: { html: string } } }
  }
}> = ({ data }) => (
  <Background>
    <IndexLayout>
      <Language.Consumer>
        {({ translate }) => (
          <CenteralizerContainer>
            <IndexSection>
              <p>Você enviou a mensagem.</p>
              <Back />
            </IndexSection>

            <LogoDecoration text={'.'} />
          </CenteralizerContainer>
        )}
      </Language.Consumer>
    </IndexLayout>
  </Background>
)

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    whoAmI: prismicWhoAmI {
      data {
        content {
          html
        }
      }
    }
  }
`

export default IndexPage
