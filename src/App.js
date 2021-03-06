import './App.css';
import React, { useEffect, useState} from 'react'

function App() {
 

  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [icono, setIcono] = useState('');
  const [texto, setTexto] = useState('');
  const [tempF, setTempF] = useState('');
  const [temp, setTemp] = useState('');
  const [grade, setGrade] = useState('CÂ°');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
    
    // Side effecttt
    useEffect(() => {

      if(latitude !== 0 && longitude !== 0){

        let apiKey ='526969a6e3b91012a7a00d03486a6b25';
        let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            setPais(data.sys.country);
            setCiudad(data.name);
            setIcono(getWeatherIcon(data.weather[0].id));
            setTempF(parseInt(kTof(data.main.temp)));  
            setTemp(`${parseInt(kTof(data.main.temp))} FÂ°`);  
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
      return 'ð©';
    } else if (condition < 400) {
      return 'ð§';
    } else if (condition < 600) {
      return 'âï¸';
    } else if (condition < 700) {
      return 'âï¸';
    } else if (condition < 800) {
      return 'ð«';
    } else if (condition === 800) {
      return 'âï¸';
    } else if (condition <= 804) {
      return 'âï¸';
    } else {
      return 'ð¤·â';
    }
  }

  const getMessage=(temp)=> {
    if (temp > 25) {
      return 'It\'s ð¦ time';
    } else if (temp > 20) {
      return 'Time for shorts and ð';
    } else if (temp < 10) {
      return 'You\'ll need ð§£ and ð§¤';
    } else {
      return 'Bring a ð§¥ just in case';
    }
  }

  const changeMesureTemp = () => {
    grade === 'FÂ°' ? setTemp(`${tempF} FÂ°`):setTemp(`${fToC(tempF)} CÂ°`);
    grade === 'FÂ°' ? setGrade('CÂ°') : setGrade('FÂ°');
    
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
