import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const personsToShow = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const changeNewName = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const changeFilter = (event) => {
    // console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={changeFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={changeNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((p) => (
          <Person key={p.name} name={p.name} number={p.number} />
        ))}
      </div>
    </div>
  );
};

export default App;
