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
import { Button } from '@material-ui/core'
import { navigate } from 'gatsby'
import { WithProjects } from 'src/components/Project'
import { Language } from 'src/state'

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
          <Menu>
            <Button
              component={'a'}
              style={{ marginRight: '1em', marginBottom: '1em' }}
              variant="outlined"
              href={'#featured-projects'}
            >
              Featured projects
            </Button>
          </Menu>
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
          <div>
            <h3>We are hiring</h3>
            <p>
              We are always hiring, leave us a link to your resumé so we can talk about how to build
              valuable technology together.
            </p>

            <Button
              style={{ margin: '1em 0 0' }}
              variant="outlined"
              onClick={() => navigate('/jobs')}
            >
              Jobs
            </Button>
          </div>
        </IndexSection>

        <LogoDecoration text={'-'} />

        <IndexSection>
          <h3>Featured projects</h3>
          <Language.Consumer>
            {({ translate }) => (
              <p
                id="featured-projects"
                style={{ marginBottom: '2em' }}
                dangerouslySetInnerHTML={{ __html: translate('portfolio_headline', 'html') }}
              />
            )}
          </Language.Consumer>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridAutoRows: 'auto',
              gridGap: 16
            }}
          >
            <WithProjects
              render={projects =>
                projects
                  .filter(project => project.node.data.featured_image.url)
                  .map((project, i) => (
                    <div key={i} style={{ textAlign: 'left' }}>
                      <img
                        src={project.node.data.featured_image.url}
                        style={{
                          maxWidth: '56px',
                          maxHeight: '56px',
                          backgroundColor: 'white',
                          borderRadius: 8
                        }}
                      />
                      <div>
                        <h4 style={{ marginBottom: 0 }}>{project.node.data.title.text}</h4>
                        <div>{project.node.data.customer}</div>
                      </div>
                    </div>
                  ))
              }
            />
          </div>
        </IndexSection>

        <LogoDecoration text={'o'} />

        <IndexSection>
          <BeAPartnerSection />
        </IndexSection>

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
