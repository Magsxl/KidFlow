import React, {useState, useEffect} from "react";
import api from "../api"
import "../styles/Schools.css";
import Logout from "../components/Logout.jsx";

function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudent();
    }, [])

    const getStudent = () => {
        api
            .get("/api/student/")
            .then((res) => res.data)
            .then((data) => {setStudents(data); console.log(data) })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Logout />
            {students.length === 0 ? (
                <p>Brak uczniów do wyświetlenia.</p>
            ) : (
                students.map((student, id) => (
                    <div key={id} className="school-container">
                        <p className="name">{student.name}</p>
                        <p className="surname">{student.surname}</p>
                        <p className="school-name">{student.school_name}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Students;