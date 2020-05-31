import React from "react";
import Person from "./Person";

const Persons = ({ persons, handleClick }) => (
  <div>
    {persons.map((p) => (
      <Person key={p.name} name={p.name} number={p.number} id={p.id} handleClick={handleClick}/>
    ))}
  </div>
);

export default Persons;
