import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Country from "./components/Country";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(({ data }) => {
      setCountries(data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowCountry(null);
  };

  const handleShow = (event) => {
    setShowCountry(filteredCountries[event.target.value]);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Display
        length={filteredCountries.length}
        filteredCountries={filteredCountries}
        handleShow={handleShow}
      />
      <Country country={showCountry} />
    </div>
  );
};

export default App;
