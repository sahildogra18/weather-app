import axios from "axios";
import "./App.css";

import { useState } from "react";
import { useEffect } from "react";

function App() {
  let [Inputdata, setInputtData] = useState("Barcelona");
  let [data, setData] = useState("");

  async function fetchWeather() {
    if (Inputdata == "") {
      alert("Please enter a valid location.");
      return;
    }

    try {
      let response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${Inputdata}&appid=0308dd6d8b07c047c7f2086be55824de`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      alert("City not found or API issue.");
      console.error(error);
    }
    setInputtData("");
  }
  useEffect(() => {
    fetchWeather();
  }, []);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      fetchWeather();
    }
  }
  function Kalvin(kalvinData) {
    return (kalvinData - 273.15).toFixed(0);
  }

  return (
    <div className="app">
      <div className="serach ml-14 pt-4">
        <input
          type="text"
          placeholder="Enter your Location"
          onKeyPress={handleKeyPress}
          value={Inputdata}
          onChange={(e) => {
            setInputtData(e.target.value);
          }}
        />

        <button
          className="rounded-full border-s-black bg-[rgba(255,255,255,.2)] p-2"
          onClick={fetchWeather}
        >
          Click
        </button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data?.name}</p>
          </div>
          <div className="temp">
            <h1 className="font-bold ">{Kalvin(data?.main?.temp)}°C</h1>
          </div>
          <div className="description">
            <p>{data?.weather?.description}</p>
          </div>
        </div>
        <div className="bootom">
          <div className="feels">
            <p>{Kalvin(data?.main?.feels_like)}°C</p>
            <p className="bold">Feels like</p>
          </div>
          <div className="humidity">
            <p>{data?.main?.humidity} %</p>
            <p className="bold">Humidity</p>
          </div>
          <div className="wind">
            <p>{data?.wind?.speed} MP/H</p>
            <p className="bold">Windspeed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
