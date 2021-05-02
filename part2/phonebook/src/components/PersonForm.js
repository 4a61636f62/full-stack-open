import React from "react";

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => (
    <div>
        <h3>Add a new</h3>
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
                <br />
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </div>
)

export default PersonForm