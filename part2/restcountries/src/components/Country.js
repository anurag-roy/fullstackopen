import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      </div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((l) => (
          <li key={l.iso639_2}>{l.name}</li>
        ))}
      </ul>
      <div>
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          width="256"
          height="128"
        />
      </div>
    </div>
  );
};

export default Country;
