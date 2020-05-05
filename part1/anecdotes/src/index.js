import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const addVote = (selected) => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const setRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <div>
      <h3>Anecdote of the day</h3>
      {anecdotes[selected]} <br></br>
      has {votes[selected]} votes
      <div>
        <Button handleClick={() => addVote(selected)} text="vote" />
        <Button handleClick={() => setRandom()} text="next anecdote" />
      </div>
      <h3>Anecdote with most votes</h3>
      {anecdotes[votes.indexOf(Math.max(...votes))]} <br></br>
      has {Math.max(...votes)} votes
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
