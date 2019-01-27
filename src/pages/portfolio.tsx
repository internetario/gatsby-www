import * as React from 'react'

import IndexLayout from 'src/layouts'
import { Logo } from 'src/components/Logo'

import {
  Background,
  CenteralizerContainer,
  IndexSection,
  LogoDecoration
} from '../components/Layout'
import { Back } from 'src/components/navigation/Back'
import { WithProjects } from 'src/components/Project'
import { GenericContact } from 'src/components/Contact'
import { Language } from 'src/state'
import { BeAPartner } from 'src/components/BeAPartner'

const IndexPage: React.SFC<{}> = () => (
  <Background>
    <IndexLayout>
      <Language.Consumer>
        {({ translate }) => (
          <CenteralizerContainer>
            <IndexSection style={{ textAlign: 'center' }}>
              <Logo />
            </IndexSection>

            <IndexSection>
              <Back />
            </IndexSection>

            <IndexSection>
              <p
                style={{ marginBottom: '5em' }}
                dangerouslySetInnerHTML={{ __html: translate('portfolio_headline', 'html') }}
              />
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

            <LogoDecoration text={'i'} />

            <IndexSection>
              <BeAPartner />
            </IndexSection>

            <LogoDecoration text={'o'} />

            <IndexSection>
              <GenericContact />
            </IndexSection>
          </CenteralizerContainer>
        )}
      </Language.Consumer>
    </IndexLayout>
  </Background>
)

export default IndexPage
