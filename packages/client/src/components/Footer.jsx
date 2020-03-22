import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

import HackathonLogo from './HackathonLogo.svg'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="footer">
        <Logo />
        <div className="footer-blocks">
          <div className="footer-block">
            <label>{t('footer.service.label')}</label>
            <Link to="/infected">{t('footer.service.infected')}</Link>
            <Link to="/risked">{t('footer.service.risked')}</Link>
          </div>

          <div className="footer-block">
            <label>{t('footer.aboutus.label')}</label>
          </div>

          <div className="footer-block">
            <label>{t('footer.support.label')}</label>
            <Link to="#">{t('footer.support.contact')}</Link>
            <Link to="#">{t('footer.support.updates')}</Link>
          </div>

          <div className="footer-block">
            <label>{t('footer.supportedby.label')}</label>
            <a target="_blank" href="https://wirvsvirushackathon.org/"><img alt="WirVsVirus Hackathon Logo" src={HackathonLogo} style={{ width: 164, height: 75 }} /></a>
          </div>
        </div>
      </div>
      <FootingFooter />
    </>
  )
}

const FootingFooter = () => {
  const { t } = useTranslation()

  return (
    <div className="footingfooter">
      <span className="footingfooter-link">{t('links.imprint')}</span>
      <span className="footingfooter-link">{t('links.datapolicy')}</span>
    </div>
  )
}

export default Footer
