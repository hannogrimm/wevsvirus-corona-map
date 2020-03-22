import React from 'react'
import Navbar from '../components/Navbar'
import InfoBanner from '../components/InfoBanner'
import { useTranslation } from 'react-i18next'

import Hero from '../components/Hero.svg'
import InfoBlockImage from '../components/InfoBlockImage.svg'
import { Link } from 'react-router-dom'

import Step1Image from '../components/Step1Image.png'
import Step2Image from '../components/Step2Image.svg'
import HeatMap from '../HeatMap'

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <>
      <InfoBanner />
      <Navbar />

      <div style={{ paddingLeft: 55 }}>
        <h5 style={{ fontWeight: '900', marginBottom: 15 }}>{t('home.headline')}</h5>
        <div className="hero-header" style={{ paddingBottom: '10px' }}>
          <div style={{ flex: '50%' }}>
            <h1>{t('home.prompt')}</h1>
            <p>
              {t('home.info')}
              <br />
              <br />
              {t('home.info2')}
            </p>
          </div>
          <div className="hero-img" style={{ flex: '60%', minWidth: '500px', display: 'flex', alignItems: 'center' }}>
            <img alt="hero" style={{ width: '100%' }} src={Hero} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex-row">
          <Link to="/infected">
            <button className="cta-button primary">{t('home.cta.infected')}</button>
          </Link>
          <Link to="/risked">
            <button className="cta-button">{t('home.cta.risked')}</button>
          </Link>
        </div>
      </div>

      <div class="container" style={{ marginTop: 150 }}>
        <div class="flex-row additional-container" style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
          <h3 style={{ maxWidth: 400 }}>{t('steps.header.headline')}</h3>
          <span style={{ maxWidth: 400 }}>{t('steps.header.text')}</span>
        </div>

        <div class="app-step additional-container">
          <div style={{ flex: '50%' }}>
            <img alt="Step 1" src={Step1Image} />
          </div>
          <div style={{ flex: '50%' }}>
            <h4>{t('steps.step1.headline')}</h4>
            <p>
              <span>{t('steps.step1.text1')}</span>
              <br />
              <br />
              <span>{t('steps.step1.text2')}</span>
            </p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Link to="/infected">
                <span className="inline-cta">{t('steps.step1.cta_infected')}</span>
              </Link>
              <Link to="/risked">
                <span className="inline-cta">{t('steps.step1.cta_risked')}</span>
              </Link>
            </div>
          </div>
        </div>

        <div class="app-step additional-container" style={{ marginLeft: 50 }}>
          <div style={{ flex: '50%' }}>
            <h4>{t('steps.step2.headline')}</h4>
            <p>
              <span>{t('steps.step2.text1')}</span>
            </p>
          </div>

          <div style={{ flex: '50%', display: 'flex', justifyContent: 'center' }}>
            <img alt="Step 2" style={{ maxWidth: 300 }} src={Step2Image} />
          </div>
        </div>

        <div class="app-step" style={{ paddingRight: 200, marginBottom: 50 }}>
          <div style={{ flex: '60%' }}>
            <HeatMap height="40vh" />
          </div>

          <div style={{ flex: '40%', marginLeft: 100 }}>
            <h4>{t('steps.step3.headline')}</h4>
            <p>
              <span>{t('steps.step3.text1')}</span>
              <br />
              <br />
              <span>{t('steps.step3.text2')}</span>
            </p>
          </div>
        </div>
      </div>

      <div
        id="abouttheproject"
        class="container"
        style={{
          background: '#F6BD60',
          paddingTop: '80px',
          paddingBottom: '80px',
          marginTop: 50,
          position: 'relative',
        }}
      >
        <div className="flex-row">
          <img
            style={{ position: 'absolute', maxWidth: 300, bottom: '-13px', left: '60px', height: 200, width: 250 }}
            src={InfoBlockImage}
          />
          <div style={{ flex: '50%' }}>
            <div className="flex-row">
              <h2 style={{ textAlign: 'right' }}>{t('abouttheproject.headline')}</h2>
              <svg
                style={{ marginRight: 100, marginLeft: 50, height: '100%' }}
                width="15"
                viewBox="0 0 10 289"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="5" y1="1.5299e-07" x2="5" y2="289" stroke="black" stroke-width="7" />
              </svg>
            </div>
          </div>
          <div style={{ flex: '50%', display: 'flex', alignItems: 'center' }}>
            <p>
              <span>{t('abouttheproject.texts.anonymous.around1')}</span>{' '}
              <strong>{t('abouttheproject.texts.anonymous.bold')}</strong>{' '}
              <span>{t('abouttheproject.texts.anonymous.around2')}</span>
              <br />
              <br />
              <span>{t('abouttheproject.texts.nopersonaldata.around1')}</span>{' '}
              <strong>{t('abouttheproject.texts.nopersonaldata.bold')}</strong>{' '}
              <span>{t('abouttheproject.texts.nopersonaldata.around2')}</span>
              <br />
              <br />
              <span>{t('abouttheproject.texts.free.around1')}</span>{' '}
              <strong>{t('abouttheproject.texts.free.bold')}</strong>
              <span>{t('abouttheproject.texts.free.around2')}</span>
              <br />
              <br />
              <span>{t('abouttheproject.texts.tobedeleted.around1')}</span>{' '}
              <strong>{t('abouttheproject.texts.tobedeleted.bold')}</strong>
              <span>{t('abouttheproject.texts.tobedeleted.around2')}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
