import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapState = state => ({
  dolphins: state.dolphins,
  sharks: state.sharks,
})
const mapDispatch = dispatch => ({
  incrementDolphins: () => dispatch.dolphins.increment(),
  incrementDolphinsAsync: () => dispatch.dolphins.incrementAsync(),
  incrementSharks: () => dispatch.sharks.increment(1),
  incrementSharksAsync: () => dispatch.sharks.incrementAsync(1),
  incrementSharksAsync2: () => dispatch({ type: 'sharks/incrementAsync', payload: 2 }),
})

const Count = (props) => {
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
        <h3>Dolphins</h3>
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

Count.propTypes = {
  dolphins: PropTypes.number.isRequired,
  sharks: PropTypes.number.isRequired,
  incrementDolphins: PropTypes.func.isRequired,
  incrementDolphinsAsync: PropTypes.func.isRequired,
  incrementSharks: PropTypes.func.isRequired,
  incrementSharksAsync: PropTypes.func.isRequired,
  incrementSharksAsync2: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(Count)
