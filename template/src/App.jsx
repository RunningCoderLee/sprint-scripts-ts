import React from 'react';
import history from '-/utils/history'
import { Router } from 'react-router-dom'
import Routes from '-/common/Routes'

const App = () => (
  <Router history={history}>
    <Routes />
  </Router>
)

export default App;
