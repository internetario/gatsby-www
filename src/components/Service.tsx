import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Language } from 'src/state'

import Chip from '@material-ui/core/Chip'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepButton from '@material-ui/core/StepButton'

interface Service {
  node: {
    lang: string
    data: {
      order: number
      title: {
        text: string
      }
      subtitle: {
        text: string
      }
      description: {
        html: string
      }
      examples: {
        example_tag: string
      }[]
    }
  }
}
type ServicesRenderer = (data: Service[]) => React.ReactNode

export const WithServices: React.SFC<{
  render: ServicesRenderer
}> = ({ render }) => (
  <Language.Consumer>
    {({ selected = '' }) => (
      <StaticQuery
        render={data =>
          render(
            data.services.edges.filter(
              (edge: Service) => edge.node.lang.toLowerCase().indexOf(selected.toLowerCase()) >= 0
            )
          )
        }
        query={graphql`
          {
            services: allPrismicService {
              edges {
                node {
                  lang
                  data {
                    order
                    title {
                      text
                    }
                    subtitle {
                      text
                    }
                    description {
                      html
                    }
                    examples {
                      example_tag
                    }
                  }
                }
              }
            }
          }
        `}
      />
    )}
  </Language.Consumer>
)

export class ServicesSection extends React.Component<{}, { activeStep: number }> {
  state = {
    activeStep: 0
  }

  handleNext = (step?: number | null) => {
    this.setState(state => ({
      activeStep: step !== undefined && step != null ? step : state.activeStep + 1
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
