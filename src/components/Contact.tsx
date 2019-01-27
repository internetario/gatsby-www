import * as React from 'react'
import { TextField, Button } from '@material-ui/core'
import { Language } from 'src/state'

export const GenericContact: React.SFC = () => (
  <Language.Consumer>
    {({ translate }) => (
      <section>
        <form id="contact-form" name="contact-form" data-netlify="true" action="/contact-sent">
          <div>
            <TextField
              style={{ width: '100%' }}
              required
              name="name"
              label={translate('contact_name')}
              margin="dense"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: '100%' }}
              required
              name="email"
              label={translate('contact_email')}
              type="email"
              margin="dense"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: '100%' }}
              required
              name="phone"
              label={translate('contact_phone')}
              type="phone"
              margin="dense"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: '100%' }}
              required
              name="message"
              label={translate('contact_message')}
              multiline
              rows="2"
              rowsMax="4"
              margin="dense"
              variant="outlined"
            />
          </div>
          <p>{translate('contact_subtitle')}</p>
          <Button
            variant="outlined"
            onClick={() => {
              const form: HTMLFormElement | null = document.querySelector('#contact-form')
              if (form) form.submit()
            }}
          >
            {translate('send')}
          </Button>
        </form>
      </section>
    )}
  </Language.Consumer>
)
