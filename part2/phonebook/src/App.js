import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((p) => (
          <Person key={p.name} name={p.name} number={p.number} />
        ))}
      </div>
    </div>
  );
};

export default App;
