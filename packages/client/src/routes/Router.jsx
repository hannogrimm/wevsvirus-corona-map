import React from 'react'
import { Route, Switch } from 'react-router-dom'
import InfectedPage from '../views/InfectedPage'
import RiskedPage from '../views/RiskedPage'
import HomePage from '../views/HomePage'

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/infected" exact component={InfectedPage} />
      <Route path="/risked" exact component={RiskedPage} />
    </Switch>
  )
}
