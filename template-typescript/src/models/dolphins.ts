import { delay } from '-/utils'
import { IModel } from './dolphins.d'
import { RematchDispatch } from '@rematch/core'

const initState = 0

const dolphins: IModel = {
  state: initState,
  reducers: {
    increment: (state: number) => state + 1,
  },
  effects: (dispatch: RematchDispatch) => ({
    async incrementAsync() {
      await delay(500)
      dispatch.dolphins.increment()
    },
  }),
}

export default dolphins
