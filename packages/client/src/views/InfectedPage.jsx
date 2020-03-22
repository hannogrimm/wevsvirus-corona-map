import React from 'react'
import AnonymousBanner from '../components/AnonymousBanner'
import Navbar from '../components/Navbar'
import Map from '../Map'
import LocationForm from '../components/LocationForm'
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
          <div className="form" style={{ flex: '40%' }}>
            <LocationForm />
          </div>
          <div style={{ flex: '60%', textAlign: 'right' }}>
            <h1>{t('infected.prompt')}</h1>
            <p>{t('infected.info')}</p>
          </div>
        </div>
      </div>

      <Map />
    </>
  )
}

export default InfectedPage
