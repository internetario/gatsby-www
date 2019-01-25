import * as React from 'react'
import { navigate } from 'gatsby'
import Button from '@material-ui/core/Button'
import { Language } from 'src/state'

export const Back: React.SFC = () => (
  <Language.Consumer>
    {({ translate }) => (
      <Button variant="outlined" onClick={() => navigate('/')}>
        {translate('back')}
      </Button>
    )}
  </Language.Consumer>
)
