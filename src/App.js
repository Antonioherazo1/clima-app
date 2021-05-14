import './App.css';
import React, { useEffect, useState} from 'react'

function App() {
 

  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [icono, setIcono] = useState('');
  const [texto, setTexto] = useState('');
  const [tempF, setTempF] = useState('');
  const [temp, setTemp] = useState('');
  const [grade, setGrade] = useState('C°');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
    
    // Side effect
    useEffect(() => {

      if(latitude !== 0 && longitude !== 0){

        let apiKey ='526969a6e3b91012a7a00d03486a6b25';
        let apiUrl=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            setPais(data.sys.country);
            setCiudad(data.name);
            setIcono(getWeatherIcon(data.weather[0].id));
            setTempF(parseInt(kTof(data.main.temp)));  
            setTemp(`${parseInt(kTof(data.main.temp))} F°`);  
            setTexto(getMessage(fToC(kTof(data.main.temp))));     
          });   
      }
    },[latitude,longitude, tempF]);


    useEffect(()=> {
    
      const getLocation = async ()=>{
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function(position){
            setLatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
          }); 
        }
      };
      getLocation();
    },[])
    

  const kTof = (k) => {
    return 1.8*(k-273) + 32;
  }

  const fToC = (f) => {
    return parseInt((f - 32)/1.8);
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
    // if(grade === 'F°') {
    //   setGrade('F°');
    //   setTemp(`${fToC(tempF)} C°`)
    // }else{
    //   setGrade('C°');
    //   setTemp(`${tempF} F°`)
    // }
    grade === 'F°' ? setTemp(`${tempF} F°`):setTemp(`${fToC(tempF)} C°`);
    grade === 'F°' ? setGrade('C°') : setGrade('F°');
    
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
    </div>
  );
}

export default App
