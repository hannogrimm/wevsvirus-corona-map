import React from 'react'
import AnonymousBanner from '../components/AnonymousBanner'
import Navbar from '../components/Navbar'
import ClickableMap from '../ClickableMap'
import LocationForm from '../components/LocationForm'
import { useTranslation } from 'react-i18next'

const RiskedPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <AnonymousBanner />
      <Navbar />

      <div className="container" style={{ paddingBottom: '50px' }}>
        <h4 style={{ textAlign: 'right' }}>{t('risked.thanks')}</h4>
        <div className="hero-header">
          <div className="form" style={{ flex: '40%' }}>
            <LocationForm />
          </div>
          <div style={{ flex: '60%', textAlign: 'right' }}>
            <h1>{t('risked.prompt')}</h1>
            <p>{t('risked.info')}</p>
          </div>
        </div>
      </div>

      <ClickableMap />
    </>
  )
}

export default RiskedPage