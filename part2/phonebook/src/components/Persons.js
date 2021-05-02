import React from "react";

const Persons = ({ persons, handleDelete }) => (
    <div>
        <h3>Numbers</h3>
        {persons.map(person =>
            <div key={person.id}>
            <label>
                {person.name} {person.number}
            </label>
            <button onClick={() => handleDelete(person)}>
                delete
            </button>
            </div>
         )}
    </div>
)

export default Persons