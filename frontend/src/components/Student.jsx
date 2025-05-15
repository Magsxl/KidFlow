import React from "react";
import "../styles/School.css"

function Student({student, onDelete}) {
    return <div className="school-container">
        <p className="name">{student.name}</p>
        <p className="surname">{student.surname}</p>
        <p className="school-name">{student.school_name}</p>
        <p className="parentsID">{student.parentsID}</p>
        <button className="delete-button" onClick={() => onDelete(student.id)}>
            Usuń
        </button>
    </div>
}

export default Student;