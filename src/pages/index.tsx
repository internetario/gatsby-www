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
  ratio
} from '../components/Layout'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepButton from '@material-ui/core/StepButton'

class ServicesSection extends React.Component<{}, { activeStep: number }> {
  state = {
    activeStep: 0
  }

  handleNext = (step?: number | null) => {
    this.setState(state => ({
      activeStep: step || state.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }
  render() {
    const { activeStep } = this.state
    return (
      <Language.Consumer>
        {({ translate }) => (
          <>
            <h3>{translate('services')}</h3>
            <WithServices
              render={services => (
                <Stepper
                  nonLinear
                  activeStep={activeStep}
                  orientation="vertical"
                  className="services-stepper"
                  style={{
                    backgroundColor: 'transparent',
                    padding: 0
                  }}
                >
                  {services
                    .sort((a, b) => a.node.data.order - b.node.data.order)
                    .map((service, i) => (
                      <Step key={i}>
                        <StepButton
                          onClick={() => this.handleNext(i)}
                          style={{ textAlign: 'left' }}
                        >
                          <div>{service.node.data.title.text}</div>
                          <div style={{ fontWeight: 400 }}>{service.node.data.subtitle.text}</div>
                        </StepButton>
                        <StepContent>
                          <div className="service">
                            <div
                              style={{ marginBottom: '1em' }}
                              dangerouslySetInnerHTML={{
                                __html: service.node.data.description.html
                              }}
                            />
                            {service.node.data.examples.map(example => (
                              <Chip
                                className="service-tag"
                                key={example.example_tag}
                                label={example.example_tag}
                              />
                            ))}
                          </div>
                        </StepContent>
                      </Step>
                    ))}
                </Stepper>
              )}
            />
          </>
        )}
      </Language.Consumer>
    )
  }
}

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
          <IndexCenteralizerContainer>
            <IndexSection style={{ textAlign: 'center', marginBottom: `calc(${ratio}vh - 82px)` }}>
              <Logo />
            </IndexSection>

            <IndexSection>
              <h2>{data.site.siteMetadata.title}</h2>
              <p>{data.site.siteMetadata.description}</p>
            </IndexSection>

            <IndexSection>
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
            </IndexSection>

            <LogoDecoration text={'I'} />

            <IndexSection>
              <h3>Por quê existo?</h3>
              <div dangerouslySetInnerHTML={{ __html: data.whoAmI.data.content.html }} />
            </IndexSection>

            <LogoDecoration text={'r'} />

            <IndexSection>
              <ServicesSection />
            </IndexSection>

            <LogoDecoration text={'i'} />

            <IndexSection style={{ textAlign: 'center' }}>
              <h3>{translate('Seja um sócio')}</h3>
              <p>Todo projeto de tecnologia precisa de responsáveis técnicos.</p>
              <p>Você tem um projeto? Nós podemos trabalhar nisso juntos.</p>
            </IndexSection>

            <LogoDecoration text={'o'} />

            <IndexSection>
              <GenericContact />
            </IndexSection>

            <div style={{ top: 0, position: 'absolute', right: 5 }}>
              <PageLanguageFlags />
            </div>
          </IndexCenteralizerContainer>
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
