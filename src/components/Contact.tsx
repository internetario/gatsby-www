import * as React from 'react'
import { TextField, Button } from '@material-ui/core'

export const GenericContact: React.SFC = () => (
  <section>
    <form id="contact-form" name="contact-form" data-netlify="true" action="/contact-sent">
      <div>
        <TextField
          style={{ width: '100%' }}
          required
          name="name"
          label="Digite seu nome"
          margin="dense"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          style={{ width: '100%' }}
          required
          name="email"
          label="Seu email"
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
          label="Telefone"
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
          label="E sua mensagem"
          multiline
          rows="2"
          rowsMax="4"
          margin="dense"
          variant="outlined"
        />
      </div>
      <p>Retornaremos assim que possível.</p>
      <Button
        variant="outlined"
        onClick={() => {
          const form: HTMLFormElement | null = document.querySelector('#contact-form')
          if (form) form.submit()
        }}
      >
        Enviar
      </Button>
    </form>
  </section>
)
