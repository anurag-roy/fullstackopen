import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => {
        alert("Could not load data from the server.");
        console.error(error);
      });
  }, []);

  const personsToShow = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const addPerson = (event) => {
    event.preventDefault();
    const duplicatePerson = persons.find((p) => p.name === newName);
    if (duplicatePerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPerson = { name: duplicatePerson.name, number: newNumber };
        personService
          .update(duplicatePerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.name === newName ? returnedPerson : p))
            );
            setNotification({
              type: "info",
              message: `Updated phone number for ${returnedPerson.name}`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              type: "error",
              message: `Information of ${newPerson.name} has already been removed from the server`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(persons.filter((p) => p.name !== newName));
          });
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification({
            type: "info",
            message: `Added ${returnedPerson.name}`,
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          alert("Could not add person to phonebook.");
          console.error(error);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  const deletePerson = (id) => {
    const { name } = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((p) => p.id !== id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} changeFilter={changeFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        changeNewName={changeNewName}
        newNumber={newNumber}
        changeNewNumber={changeNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleClick={deletePerson} />
    </div>
  );
};

export default App;
