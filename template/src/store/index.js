import { init } from '@rematch/core'
import storage from 'redux-persist/lib/storage'
import * as models from '-/models'
import createLoadingPlugin from '@rematch/loading'
import createRematchPersist from '@rematch/persist'
// Options 设置请参考
// https://github.com/rematch/rematch/blob/master/plugins/loading/README.md#options
const loadingPlugin = createLoadingPlugin({})
const persistPlugin = createRematchPersist({
  key: 'root',
  whitelist: ['sharks'],
  throttle: 2000,
  version: 1,
  storage,
})
//  const reactRouterPlugin = createReactRouterPlugin()
const store = init({
  models,
  plugins: [
    loadingPlugin,
    persistPlugin,
  ],
})

export default store
