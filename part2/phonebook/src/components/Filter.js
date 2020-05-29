import React from "react";

const Filter = ({ filter, changeFilter }) => (
  <div>
    Filter shown with <input value={filter} onChange={changeFilter} />
  </div>
);

export default Filter;
