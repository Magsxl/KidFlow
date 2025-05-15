import React from "react";
import "../styles/School.css"

function School({school, onDelete}) {
    return <div className="school-container">
        <p className="school-name">{school.name}</p>
        <p className="school-city">{school.city}</p>
        <button className="delete-button" onClick={() => onDelete(school.id)}>
            Delete
        </button>
    </div>
}

export default School;