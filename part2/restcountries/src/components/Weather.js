import React from "react";

const Weather = ({ weatherData }) => {
  if (weatherData === null) return <div></div>;
  const { location, current } = weatherData;
  return (
    <div>
      <h3>Weather in {location.name}</h3>
      <div>
        <b>temperature: </b>
        {current.temperature} Celsius
        <div>
          <img
            src={current.weather_icons[0]}
            alt={current.weather_descriptions[0]}
          ></img>
        </div>
        <b>wind: </b>
        {current.wind_speed} mph direction {current.wind_dir}
      </div>
    </div>
  );
};

export default Weather;
