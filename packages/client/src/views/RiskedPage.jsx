import React from 'react'
import AnonymousBanner from '../components/AnonymousBanner'
import Navbar from '../components/Navbar'
import ClickableMap from '../ClickableMap'
import LocationForm from '../components/form/LocationForm'
import { useTranslation } from 'react-i18next'
import HeatMap from '../HeatMap'

const RiskedPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <AnonymousBanner />
      <Navbar />

      <div className="container" style={{ paddingBottom: '50px' }}>
        <h5 style={{ textAlign: 'right' }}>{t('risked.thanks')}</h5>
        <div className="hero-header">
          <div className="form">
            <LocationForm infected={false} />
          </div>
          <div style={{ marginLeft: '50%', flex: '100%', textAlign: 'right' }}>
            <h1>{t('risked.prompt')}</h1>
            <p>{t('risked.info')}</p>
          </div>
        </div>
      </div>

      <HeatMap />
    </>
  )
}

export default RiskedPage
