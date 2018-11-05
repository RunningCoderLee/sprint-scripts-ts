import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { getPersistor } from '@rematch/persist'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { Router } from 'react-router-dom'
import history from '-/utils/history'
import Routes from '-/common/Routes'
import store from '-/store/index'
import 'moment/locale/zh-cn'

const persistor = getPersistor()

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <LocaleProvider locale={zhCN}>
          <Routes />
        </LocaleProvider>
      </Router>
    </PersistGate>
  </Provider>
)

export default App
