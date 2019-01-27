import * as React from 'react'

import IndexLayout from 'src/layouts'
import { Language } from 'src/state'
import { GenericContact } from 'src/components/Contact'

import { Background, CenteralizerContainer, IndexSection } from '../components/Layout'
import { Back } from 'src/components/navigation/Back'

const IndexPage: React.SFC = () => (
  <Background>
    <IndexLayout>
      <Language.Consumer>
        {({ translate }) => (
          <CenteralizerContainer>
            <IndexSection style={{ marginBottom: '5em' }}>
              <Back />
            </IndexSection>

            <IndexSection>
              <p>{translate('contact_title')}</p>
              <GenericContact />
            </IndexSection>
          </CenteralizerContainer>
        )}
      </Language.Consumer>
    </IndexLayout>
  </Background>
)

export default IndexPage
