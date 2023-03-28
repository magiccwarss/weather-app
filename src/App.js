import React, { useState } from 'react';
import './reset.css';
import './App.css';
const api = {
  key: '8219fdab67f90220f3035bff4bfe5869',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [farenheit, setFarenheit] = useState(false);

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              {farenheit === false ? (
                <div onClick={() => setFarenheit(true)} className="temp">
                  {Math.round(weather.main.temp)}°C
                </div>
              ) : (
                <div onClick={() => setFarenheit(false)} className="temp">
                  {Math.round(weather.main.temp * 33, 8)}°F
                </div>
              )}

              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
