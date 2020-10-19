import * as React from 'react'
import { Language } from 'src/state'

export const BeAPartner: React.SFC = () => (
  <Language.Consumer>
    {({ translate }) => (
      <div style={{ textAlign: 'left' }}>
        <h3>{translate('be_a_partner')}</h3>
        <div dangerouslySetInnerHTML={{ __html: translate('be_a_partner_description', 'html') }} />
      </div>
    )}
  </Language.Consumer>
)
