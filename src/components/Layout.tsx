import * as React from 'react'
import { Logo } from 'src/components/Logo'

const ratio = 38.1966

export const Background: React.SFC = ({ children }) => (
  <div style={{ minHeight: '100vh', backgroundColor: '#000' }}>{children}</div>
)

export const IndexCenteralizerContainer: React.SFC = ({ children }) => (
  <div
    style={{
      margin: `${ratio}vh auto 0`,
      padding: '0 0 5em',
      width: '61vw',
      minWidth: '290px',
      maxWidth: '700px'
    }}
  >
    {children}
  </div>
)

export const CenteralizerContainer: React.SFC = ({ children }) => (
  <div
    style={{
      margin: `0 auto`,
      padding: '5em 0',
      width: '61vw',
      minWidth: '290px',
      maxWidth: '700px'
    }}
  >
    {children}
  </div>
)

export const IndexSection: React.SFC<{
  style?: React.CSSProperties
}> = ({ children, style = {} }) => (
  <section style={{ margin: '2em 0', ...style }}>{children}</section>
)

export const LogoDecoration: React.SFC<{
  text: string
}> = ({ text }) => (
  <IndexSection style={{ textAlign: 'center', marginTop: '6em' }}>
    <div style={{ marginRight: -30 }}>
      <Logo text={text} />
    </div>
  </IndexSection>
)
