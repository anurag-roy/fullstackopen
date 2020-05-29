import React from "react";

const PersonForm = ({addPerson, newName, changeNewName, newNumber, changeNewNumber}) => (
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
);

export default PersonForm;
