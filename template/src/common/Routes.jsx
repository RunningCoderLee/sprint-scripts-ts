import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ReactHome from '-/pages/react'
import Antd from '-/pages/antd'
import Count from '-/pages/count'
import PageNotFound from '-/pages/pageNotFound'

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path="/react" component={ReactHome} />
      <Route exact path="/antd" component={Antd} />
      <Route exact path="/count" component={Count} />
      <Redirect exact from="/" to="/react" />
      <Route component={PageNotFound} />
    </Switch>
  </Fragment>
)

export default Routes
