import React from "react";

const Display = ({ length, filteredCountries, handleShow }) => {
  if (length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (length > 1) {
    return filteredCountries.map((c, i) => (
      <div key={c.name}>
        {c.name}{" "}
        <button value={i} onClick={handleShow}>
          show
        </button>
      </div>
    ));
  } else if (length === 0) {
    return <div>No matches found</div>;
  }
};

export default Display;
