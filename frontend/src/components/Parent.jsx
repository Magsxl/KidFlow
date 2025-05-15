import React from "react";
import "../styles/School.css"

function Parent({parent, onDelete}) {
    return <div className="school-container">
        <p className="name">{parent.name}</p>
        <p className="surname">{parent.surname}</p>
        <p className="school-name">{parent.school_name}</p>
        <button className="delete-button" onClick={() => onDelete(parent.id)}>
            Usuń
        </button>
    </div>
}

export default Parent;