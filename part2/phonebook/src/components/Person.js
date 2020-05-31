import React from "react";

const Person = ({ name, number, handleClick, id }) => (
  <div>
    {name} {number} <button onClick={() => handleClick(id)}>delete</button>
  </div>
);

export default Person;
