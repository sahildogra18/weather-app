import axios from "axios";
import "./App.css";

import { useState } from "react";
import { useEffect } from "react";

function App() {
  let [Inputdata, setInputtData] = useState("Barcelona");
  let [data, setData] = useState({});

  let fetchApiData = async () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${Inputdata}&appid=0308dd6d8b07c047c7f2086be55824de`
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log("m aa gya");
        setInputtData("");
      })
      .catch((error) => {
        console.log(error);
        alert("ApI response failed or failed to find city");
        setInputtData("");
      });
  };
  useEffect(() => {
    fetchApiData();
  }, []);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      fetchApiData();
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
      </div>
      <button
        className="rounded-full border-s-black bg-[rgba(255,255,255,.2)] p-5  ml-[140px] mt-3 font-bold   "
        onClick={fetchApiData}
      >
        Search Here
      </button>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data?.name}</p>
          </div>
          <div className="temp">
            <h1 className="font-bold ">{Kalvin(data?.main?.temp)}°C</h1>
          </div>
          <div className="description">
            <p>{data?.weather?.[0]?.description || "Loading..."}</p>
          </div>
        </div>
        <div className="bootom flex gap-2 p-1">
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
