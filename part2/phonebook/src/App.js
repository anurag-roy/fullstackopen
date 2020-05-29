import React, { useState } from "react";

const Person = ({ name }) => <div>{name}</div>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
    };
    setPersons(persons.concat(newObject));
    setNewName("");
  };

  const changeNewName = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={changeNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((p) => (
          <Person key={p.name} name={p.name} />
        ))}
      </div>
    </div>
  );
};

export default App;
