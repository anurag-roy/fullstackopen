import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, buttonTitle }) => (
  <button onClick={handleClick}>{buttonTitle}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 - bad * 1) / total;
  const positive = `${(good * 100) / total} %`;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  // return (
  //   <div>
  //     <Statistic text='good' value={good} />
  //     <Statistic text='neutral' value={neutral} />
  //     <Statistic text='bad' value={bad} />
  //     <Statistic text='average' value={average} />
  //     <Statistic text='positive' value={positive} />
  //   </div>
  // );

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h4>
        <b>give feedback</b>
      </h4>
      <Button handleClick={() => setGood(good + 1)} buttonTitle="good" />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        buttonTitle="neutral"
      />
      <Button handleClick={() => setBad(bad + 1)} buttonTitle="bad" />
      <h4>
        <b>statistics</b>
      </h4>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
