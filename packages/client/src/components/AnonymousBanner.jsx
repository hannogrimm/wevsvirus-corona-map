import React from 'react'
import { useTranslation } from 'react-i18next'

const AnonymousBanner = () => {
  const { t } = useTranslation()
  return (
    <div className="anonymous-banner">
      <span>
        {t('anonymous.text')} <a href="#">{t('anonymous.link')}</a>
      </span>
    </div>
  )
}

export default AnonymousBanner
