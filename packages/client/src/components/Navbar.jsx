import React from 'react'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { i18n } = useTranslation()

  const changeLanguage = lang => {
    i18n.changeLanguage(lang)
  }

  return (
    <nav className="nav container">
      <rect className="logo" width="100" height="40" />
      <div className="lang-option">
        <span className={i18n.language === 'de' ? 'selected' : ''} onClick={() => changeLanguage('de')}>
          DE
        </span>
        <span className={i18n.language === 'en' ? 'selected' : ''} onClick={() => changeLanguage('en')}>
          EN
        </span>
      </div>
    </nav>
  )
}

export default Navbar
