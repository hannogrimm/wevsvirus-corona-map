import React from 'react'

import { Router } from 'react-router-dom'
import { Routes } from './routes/Router'
import history from './routes/history'

import './styles/app.css'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router history={history}>
      <div className="App">
        <Routes />
        <Footer />
      </div>
    </Router>
  )
}

export default App
