import {
  init, RematchRootState, Models, ExtractRematchDispatchersFromEffects,
} from '@rematch/core'
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

const store = init({
  models,
  plugins: [
    loadingPlugin,
    persistPlugin,
  ],
})

type Loading < M extends Models > = {
  models: {
    [modelKey in keyof M]: M[modelKey]['name']
  },
  effects: {
    [modelKey in keyof M]: ExtractRematchDispatchersFromEffects<M[modelKey]['effects']>
  },
} & {
  global: boolean,
}

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type RootState = RematchRootState<typeof models> & { loading: Loading<typeof models>}

export default store
