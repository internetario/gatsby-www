import * as React from 'react'

import IndexLayout from 'src/layouts'
import { Logo } from 'src/components/Logo'
import { Menu } from 'src/components/Menu'
import { PageLanguageFlags } from 'src/components/Languages'
import { GenericContact } from 'src/components/Contact'
import {
  Background,
  IndexCenteralizerContainer,
  IndexSection,
  LogoDecoration,
  ratio
} from '../components/Layout'

import { BeAPartner as BeAPartnerSection } from 'src/components/BeAPartner'
import { WhyDoIExist } from 'src/components/Why'
import { About } from 'src/components/About'
import { ServicesSection } from 'src/components/Service'

const IndexPage: React.SFC = () => (
  <Background>
    <IndexLayout>
      <IndexCenteralizerContainer>
        <IndexSection style={{ textAlign: 'center', marginBottom: `calc(${ratio}vh - 82px)` }}>
          <Logo />
        </IndexSection>

        <IndexSection>
          <About />
        </IndexSection>

        <IndexSection>
          <Menu />
        </IndexSection>

        <LogoDecoration text={'I'} />

        <IndexSection>
          <WhyDoIExist />
        </IndexSection>

        <LogoDecoration text={'r'} />

        <IndexSection>
          <ServicesSection />
        </IndexSection>

        <LogoDecoration text={'i'} />

        <IndexSection>
          <BeAPartnerSection />
        </IndexSection>

        <LogoDecoration text={'o'} />

        <IndexSection>
          <GenericContact />
        </IndexSection>

        <div style={{ top: 0, position: 'absolute', right: 5 }}>
          <PageLanguageFlags />
        </div>
      </IndexCenteralizerContainer>
    </IndexLayout>
  </Background>
)

export default IndexPage
