import './App.css';
import React, { useEffect, useState } from 'react'

function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const apiKey = '526969a6e3b91012a7a00d03486a6b25';
  const url =`api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const [grados, setGrados] = useState(0);
  
  
  // useEffect(()=>{
  //   obtenerCoordenadas();
  // })
  

  const obtenerDatos = async ()=>{
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position){
        setLatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
      });
    }
    const data = await fetch ({url})
    const coordenadas = data.json()
    console.log(coordenadas);
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <p>latitud: {latitude}</p>
      <p>longitud: {longitude}</p>
      <button onClick={()=>{obtenerDatos()}}> click</button>
    </div>
  );
}

export default App
