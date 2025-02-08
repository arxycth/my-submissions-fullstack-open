import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weathers'
import weatherIconService from './services/weatherIcons'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weather, setWeather] = useState('')
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [getWeather, setGetWeather] = useState(false)
  const [getDay, setGetDay] = useState('')
  const [getTemperature, setGetTemperature] = useState('')
  const [getWind, setGetWind] = useState('')


  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountry => {
        setCountries(initialCountry)
      }),

    weatherIconService
      .getAll()
      .then(initialIcon => {
        setWeatherIcon(initialIcon)
      })
  },[])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    setGetWeather(true)
  }

  const countriesFilter = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const handleClick = name => {
    setNewFilter(name)
    setGetWeather(true)
  }

  const Weather = ({country}) => {
    if (getWeather){
      weatherService
        .getAll(countriesFilter[0].capitalInfo.latlng[0],countriesFilter[0].capitalInfo.latlng[1])
        .then(initialWeather => {
          setGetWeather(false)
          setWeather(initialWeather.current.weather_code)
          setGetDay(initialWeather.current.is_day==1?'day':'night')
          setGetTemperature(initialWeather.current.temperature_2m)
          setGetWind(initialWeather.current.wind_speed_10m)
        })
    } 
    if (typeof weather === 'number'){
      return (
        <div>
          <h2>Weather in {country.capital.map(capital => `${capital} `)}</h2>
          <p>temperature {getTemperature} Celcius</p>
          <img src={weatherIcon[weather][getDay].image} alt="" />
          <p>wind {getWind} km/h</p>
        </div>
      )
    }



    


  }


  return (
    <div>
      <div>
        find countries <input value = {newFilter} onChange = {handleFilter}/>
      </div>
      {countriesFilter.length == 1?(
        countriesFilter.map(country => (
          <div key={country.area}>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital.map(capital => `${capital} `)}</p>
            <p>area {country.area}</p>
            <p><b>languages:</b></p>
            <ul>
              {Object.entries(country.languages).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <Weather country={country}/>
          </div>
        ))):(
          countriesFilter.length<=10?(
            countriesFilter.map(country => (
              <p key={country.area}>
                {country.name.common} <button onClick={() => handleClick(country.name.common)}>show</button>
              </p>
            ))):(
            newFilter==''?(
              null
            ):(
              <p>Too many matches, specify another filter</p>
            )
          )
        )
      }
    </div>
    
    
  )
}

export default App
