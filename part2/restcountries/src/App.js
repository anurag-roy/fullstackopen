import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(({ data }) => {
      setCountries(data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Display countries={countries} filter={filter} />
    </div>
  );
};

export default App;
