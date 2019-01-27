import * as React from 'react'
import IndexLayout from 'src/layouts'
import { Back } from 'src/components/navigation/Back'
import { Background, CenteralizerContainer } from 'src/components/Layout'

const NotFoundPage = () => (
  <Background>
    <IndexLayout>
      <CenteralizerContainer>
        <h1>404: Página não encontrada.</h1>
        <p>
          <Back />
        </p>
      </CenteralizerContainer>
    </IndexLayout>
  </Background>
)

export default NotFoundPage
