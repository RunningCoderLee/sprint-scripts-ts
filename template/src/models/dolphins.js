import { delay } from '-/utils'

const initState = 0

const dolphins = {
  state: initState,
  reducers: {
    increment: state => state + 1,
  },
  effects: dispatch => ({
    async incrementAsync() {
      await delay(500)
      dispatch.dolphins.increment()
    },
  }),
}

export default dolphins
