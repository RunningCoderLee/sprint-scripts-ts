import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ReactHome from '-/pages/react'
import Antd from '-/pages/antd'
import PageNotFound from '-/pages/pageNotFound'

const Routes = ({ prop }) => (
  <Fragment>
    <Switch>
      <Route exact path="/react" component={ReactHome} />
      <Route exact path="/antd" component={Antd} />
      <Redirect exact from="/" to="/react" />
      <Route component={PageNotFound} />
    </Switch>
  </Fragment>
)

export default Routes