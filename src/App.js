import './App.css';
import React, { useEffect, useState} from 'react'

function App() {
 

  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [icono, setIcono] = useState('');
  const [texto, setTexto] = useState('');
  const [temp, setTemp] = useState('');
  const [grade, setGrade] = useState('F°');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [apiData, setApiData] = useState({});

  
    // Side effect
    useEffect(() => {
      getLocation();
      let apiKey ='526969a6e3b91012a7a00d03486a6b25';
      let apiUrl=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setApiData(data)
        });

        setPais(apiData.sys.country);
        setCiudad(apiData.name);
        // console.log(latitude);
        setIcono(getWeatherIcon(apiData.weather[0].id));
        setTexto(getMessage(farenheitToCelsius(apiData.main.temp)));
        setTemp(farenheitToCelsius(apiData.main.temp));
    },);

    
    

  const getLocation = async ()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position){
        setLatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
      });
    }
  };

  const farenheitToCelsius = (K) => {
    return K - 273.15;
    
  };

  const getWeatherIcon = (condition)=> {
    if (condition < 300) {
      return '🌩';
    } else if (condition < 400) {
      return '🌧';
    } else if (condition < 600) {
      return '☔️';
    } else if (condition < 700) {
      return '☃️';
    } else if (condition < 800) {
      return '🌫';
    } else if (condition === 800) {
      return '☀️';
    } else if (condition <= 804) {
      return '☁️';
    } else {
      return '🤷‍';
    }
  }

  const getMessage=(temp)=> {
    if (temp > 25) {
      return 'It\'s 🍦 time';
    } else if (temp > 20) {
      return 'Time for shorts and 👕';
    } else if (temp < 10) {
      return 'You\'ll need 🧣 and 🧤';
    } else {
      return 'Bring a 🧥 just in case';
    }
  }

  const changeMesureTemp = () => {
    grade === 'F°' ? setGrade('C°') : setGrade('F°');
    grade === 'F°' ? setTemp(apiData.main.temp) : setTemp(farenheitToCelsius(apiData.main.temp));
  }

  

  return (
    <div className="App">
      <h1>Weather App</h1>
      <p>Pais: {pais}</p>
      <p>Ciudad: {ciudad}</p>
      <p>Icono: {icono} </p> 
      <p>Texto Descriptivo: {texto}</p>
      <p>Temperatura: {temp}</p>
      <button onClick ={()=>{changeMesureTemp()}}>{grade}</button>
      {/* <p>{apiUrl}</p> */}
    </div>
  );
}

export default App
