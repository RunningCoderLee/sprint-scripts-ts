import { delay } from '-/utils'

const initState = 0

const sharks = {
  state: initState,
  reducers: {
    increment: (state, payload = 1) => state + payload,
  },
  effects: dispatch => ({
    async incrementAsync(payload = 1) {
      await delay(500)
      dispatch.sharks.increment(payload)
    },
  }),
}

export default sharks
