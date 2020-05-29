import React from "react";
import Country from "./Country";

const Display = ({ countries, filter }) => {
  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filter === "") {
    return <div>Specify a filter</div>;
  } else {
    if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filteredCountries.length > 1) {
      return filteredCountries.map((c) => <div key={c.name}>{c.name}</div>);
    } else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    }
  }

  return <div>No matches found</div>;
};

export default Display;
