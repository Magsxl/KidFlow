import React, {useState, useEffect} from "react";
import api from "../api"
import "../styles/Schools.css";
import Logout from "../components/Logout.jsx";

function Teachers() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        getTeacher();
    }, [])

    const getTeacher = () => {
        api
            .get("/api/teacher/")
            .then((res) => res.data)
            .then((data) => {setTeachers(data); console.log(data) })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Logout />
            {teachers.length === 0 ? (
                <p>Brak nauczycieli do wyświetlenia.</p>
            ) : (
                teachers.map((teacher, id) => (
                    <div key={id} className="school-container">
                        <p className="name">{teacher.name}</p>
                        <p className="surname">{teacher.surname}</p>
                        <p className="school-name">{teacher.school_name}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Teachers;