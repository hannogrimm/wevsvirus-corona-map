import React from 'react'
import { useTranslation } from 'react-i18next'
import { HashLink as Link } from 'react-router-hash-link'

const InfoBanner = () => {
  const { t } = useTranslation()
  return (
    <div className="anonymous-banner">
      <span>
        {t('infobanner.text')}{' '}
        <Link style={{ textDecoration: 'underline' }} to="/#abouttheproject">
          {t('infobanner.link')}
        </Link>
      </span>
    </div>
  )
}

export default InfoBanner
