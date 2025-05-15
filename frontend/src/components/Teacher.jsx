import React from "react";
import "../styles/School.css"

function Teacher({teacher, onDelete}) {
    return <div className="school-container">
        <p className="name">{teacher.name}</p>
        <p className="surname">{teacher.surname}</p>
        <p className="school-name">{teacher.school_name}</p>
        <button className="delete-button" onClick={() => onDelete(teacher.id)}>
            Usuń
        </button>
    </div>
}

export default Teacher;