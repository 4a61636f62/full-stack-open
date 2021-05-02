import React from "react";

const Country = ({ country, setQuery }) => (
    <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
            {country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
        </ul>
        <img src={country.flag} height="120" alt={`flag of ${country.name}`}/>
        <br />
    </div>
)

export default Country