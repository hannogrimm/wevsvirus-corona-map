import React from 'react'
import { useTranslation } from 'react-i18next'

import './styles/app.css'
import InfectedPage from './views/InfectedPage'

const App = () => {
  const { t } = useTranslation()

  return (
    <div className="App">
      <InfectedPage />
    </div>
  )
}

export default App
