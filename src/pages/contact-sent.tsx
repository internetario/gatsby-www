import * as React from 'react'

import IndexLayout from 'src/layouts'
import { Language } from 'src/state'

import {
  Background,
  IndexSection,
  LogoDecoration,
  CenteralizerContainer
} from '../components/Layout'
import { Back } from 'src/components/navigation/Back'

const IndexPage: React.SFC = () => (
  <Background>
    <IndexLayout>
      <Language.Consumer>
        {({ translate }) => (
          <CenteralizerContainer>
            <IndexSection>
              <p>{translate('contact_sent')}</p>
              <Back />
            </IndexSection>

            <LogoDecoration text={'.'} />
          </CenteralizerContainer>
        )}
      </Language.Consumer>
    </IndexLayout>
  </Background>
)

export default IndexPage
