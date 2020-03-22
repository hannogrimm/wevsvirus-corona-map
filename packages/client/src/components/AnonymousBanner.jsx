import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const AnonymousBanner = () => {
  const { t } = useTranslation()
  return (
    <div className="anonymous-banner">
      <span>
        {t('anonymous.text')}{' '}
        <a style={{ textDecoration: 'underline' }} target="_blank" href="/#abouttheproject">
          {t('anonymous.link')}
        </a>
      </span>
    </div>
  )
}

export default AnonymousBanner
