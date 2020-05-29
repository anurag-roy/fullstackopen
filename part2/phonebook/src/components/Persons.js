import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => (
  <div>
    {persons.map((p) => (
      <Person key={p.name} name={p.name} number={p.number} />
    ))}
  </div>
);

export default Persons;
