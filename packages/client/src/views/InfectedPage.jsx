import React from 'react'
import AnonymousBanner from '../components/AnonymousBanner'
import Navbar from '../components/Navbar'
import HeatMap from '../HeatMap'
import LocationForm from '../components/form/LocationForm'
import { useTranslation } from 'react-i18next'

const InfectedPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <AnonymousBanner />
      <Navbar />

      <div className="container" style={{ paddingBottom: '50px' }}>
        <h5 style={{ textAlign: 'right' }}>{t('infected.thanks')}</h5>
        <div className="hero-header">
          <div className="form">
            <LocationForm />
          </div>
          <div style={{ marginLeft: '50%', flex: '100%', textAlign: 'right' }}>
            <h1>{t('infected.prompt')}</h1>
            <p>{t('infected.info')}</p>
          </div>
        </div>
      </div>

      <HeatMap />
    </>
  )
}

export default InfectedPage
