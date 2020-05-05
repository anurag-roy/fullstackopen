import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.buttonTitle}
    </button>
  )
}

const Stats = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h4><b>give feedback</b></h4>
      <Button handleClick={() => setGood(good + 1)} buttonTitle='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} buttonTitle='neutral' />
      <Button handleClick={() => setBad(bad + 1)} buttonTitle='bad' />
      <h4><b>statistics</b></h4>
      <Stats text='good' value={good}/>
      <Stats text='neutral' value={neutral}/>
      <Stats text='bad' value={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)