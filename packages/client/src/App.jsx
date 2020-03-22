import React from 'react'

import { Router } from 'react-router-dom'
import { Routes } from './routes/Router'
import history from './routes/history'

import './styles/app.css'

const App = () => {
  return (
    <Router history={history}>
      <div className="App">
        <Routes />
      </div>
    </Router>
  )
}

export default App
