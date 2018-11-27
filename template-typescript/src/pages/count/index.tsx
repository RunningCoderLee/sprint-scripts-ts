import * as React from 'react'
import { connect } from 'react-redux'
import { RootState, Dispatch } from '-/store'

/* eslint-disable typescript/explicit-function-return-type */
const mapState = (state: RootState) => ({
  dolphins: state.dolphins,
  sharks: state.sharks,
})

const mapDispatch = (dispatch: Dispatch) => ({
  incrementDolphins: () => dispatch.dolphins.increment(),
  incrementDolphinsAsync: () => dispatch.dolphins.incrementAsync(),
  incrementSharks: () => dispatch.sharks.increment(1),
  incrementSharksAsync: () => dispatch.sharks.incrementAsync(1),
  incrementSharksAsync2: () => dispatch.sharks.incrementAsync(2),
})
/* eslint-enable typescript/explicit-function-return-type */

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

const Count = (props: Props): JSX.Element => {
  const {
    dolphins,
    incrementDolphins,
    incrementDolphinsAsync,
    sharks,
    incrementSharks,
    incrementSharksAsync,
    incrementSharksAsync2,
  } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: 120 }}>
        <h3>Dolphins1</h3>
        <h1>{dolphins}</h1>
        <button type="button" onClick={incrementDolphins}>+1</button>
        <button type="button" onClick={incrementDolphinsAsync}>Async +1</button>
      </div>
      <div style={{ width: 200 }}>
        <h3>Sharks</h3>
        <h1>{sharks}</h1>
        <button type="button" onClick={incrementSharks}>+1</button>
        <button type="button" onClick={incrementSharksAsync}>Async +1</button>
        <button type="button" onClick={incrementSharksAsync2}>Async +2</button>
      </div>
      <p>Using Rematch Models</p>
    </div>
  )
}

// NOTE: the "mapDispatch as any" is needed
// until https://github.com/rematch/rematch/issues/365 is fixed,
// as long as you run with TypeScript Strict Mode
// eslint-disable-next-line
export default connect(mapState, mapDispatch as any)(Count)
