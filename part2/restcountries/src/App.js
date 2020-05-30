import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Country from "./components/Country";
import Weather from "./components/Weather";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showCountry, setShowCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(({ data }) => {
      setCountries(data);
    });
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setShowCountry(filteredCountries[0]);
    } else setShowCountry(null);
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShow = (event) => {
    setShowCountry(filteredCountries[event.target.value]);
  };

  useEffect(() => {
    if (showCountry !== null) {
      const apiKey = process.env.REACT_APP_API_KEY;
      axios
        .get("http://api.weatherstack.com/current", {
          params: {
            access_key: apiKey,
            query: showCountry.name,
          },
        })
        .then(({ data }) => {
          setWeatherData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [showCountry]);

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Display
        length={filteredCountries.length}
        filteredCountries={filteredCountries}
        handleShow={handleShow}
      />
      <Country country={showCountry} />
      <Weather weatherData={weatherData} />
    </div>
  );
};

export default App;
