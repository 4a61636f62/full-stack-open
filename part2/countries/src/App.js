import React, {useEffect, useState} from "react"
import Search from "./components/Search"
import Country from "./components/Country"
import Weather from "./components/Weather"
import countriesService from "./services/countries";

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})

  useEffect(() => {
    countriesService.getAll().then(result => {
          setCountries(result)
        })
  },[])
    
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const countriesToShow = countries.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))

  return (
     <div>
        <Search query={query} handleChange={handleQueryChange}/>
        {countriesToShow.length > 10
            ?
                <p>Too many matches, specify another filter</p>
            :
            countriesToShow.length === 1
                ?
                    <div>
                        <Country country={countriesToShow[0]} />
                        <Weather weather={weather} setWeather={setWeather} city={countriesToShow[0].capital} />
                    </div>
                :
                    countriesToShow.map(country =>
                        <p key={country.alpha2Code}>
                            {country.name}
                            <button onClick={() => setQuery(country.name)}>show</button>
                        </p>
                    )

        }
     </div>
  )
}

export default App;
