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
          <div style={{ textAlign: 'center' }}>
            <h3>We are hiring</h3>
            <p>
              We are always hiring, leave us a link to your resumé so we can talk about how to build
              valuable technology together.
            </p>

            <Button
              style={{ marginRight: '1em', marginBottom: '1em' }}
              variant="outlined"
              onClick={() => navigate('/jobs')}
            >
              Jobs
            </Button>
          </div>
        </IndexSection>

        <LogoDecoration text={'-'} />

        <IndexSection>
          <Language.Consumer>
            {({ translate }) => (
              <p
                id="featured-projects"
                style={{ marginBottom: '5em' }}
                dangerouslySetInnerHTML={{ __html: translate('portfolio_headline', 'html') }}
              />
            )}
          </Language.Consumer>
          <WithProjects
            render={projects =>
              projects.map((project, i) => (
                <div key={i} className="project">
                  <div className="project-title">
                    <div>
                      <h3>{project.node.data.title.text}</h3>
                      <div>{project.node.data.customer}</div>
                    </div>

                    {project.node.data.featured_image.url && (
                      <img
                        src={project.node.data.featured_image.url}
                        style={{
                          float: 'right',
                          maxWidth: '56px',
                          maxHeight: '56px',
                          backgroundColor: 'white',
                          borderRadius: 8
                        }}
                      />
                    )}
                  </div>

                  <div
                    className="project-content"
                    dangerouslySetInnerHTML={{ __html: project.node.data.content.html }}
                  />
                </div>
              ))
            }
          />
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
