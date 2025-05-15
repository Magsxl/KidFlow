import {useState, useEffect} from "react";
import api from "../api";
import Parent from "../components/Parent";
import Student from "../components/Student";
import Teacher from "../components/Teacher";
import Logout from "../components/Logout";

function Admin() {
    const [parents, setParents] = useState([]);
    const [teacherName, setTeacherName] = useState("");
    const [teacherSurname, setTeacherSurname] = useState("");
    const [teacherSchool, setTeacherSchool] = useState("");
    const [teacherUsername, setTeacherUsername] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentSurname, setStudentSurname] = useState("");
    const [studentSchool, setStudentSchool] = useState("");
    const [schools, setSchools] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [parentsID, setParentsID] = useState("");

    useEffect(() => {
        async function fetchSchools(){
            api
                .get(`/api/school/`)
                .then((res) => {
                    setSchools(res.data); console.log(res.data);
                })
                .catch((err) => alert(err));
        }
        fetchSchools().catch((err) => alert(err));
        getEndpoint("parent");
        getEndpoint("student")
        getEndpoint("teacher")
    }, []);

    const getEndpoint = (endpoint) => {
        api
            .get(`/api/${endpoint}/`)
            .then((res) => res.data)
            .then((data) => {
                switch(endpoint) {
                    case "student":
                        return setStudents(data);
                    case "teacher":
                        return setTeachers(data);
                    case "parent":
                        return setParents(data);
                }
                console.log(data) })
            .catch((err) => alert(err));
    };

    const deletePerson = (id, endpoint) => {
        api
            .delete(`/api/${endpoint}/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Usunięto pomyślnie!")
                else alert("Błąd usuwania!")
                getEndpoint(endpoint);
            })
            .catch((err) => alert(err));
    };

    const createPerson = (e, endpoint, name, surname, school, parentsID = null, username, password) => {
        e.preventDefault();
        const payload = {
            name,
            surname,
            school,
            ...(endpoint === "student" && parentsID ? { parentsID } : {}),
            ...(endpoint === "teacher" && username ? { username } : {}),
            ...(endpoint === "teacher" && password ? { password } : {}),
        }
        api
            .post(`/api/${endpoint}/`, payload)
            .then((res) => {
                if (res.status === 201) alert("Użytkownik dodany pomyślnie!")
                else alert("Błąd dodawania!")
                getEndpoint(endpoint);
            })
            .catch((err) => alert(err));
    }

    return (
        <div>
            <Logout />
            <div>
                <h2>Nauczyciele</h2>
                {teachers.map((teacher) => (
                    <Teacher teacher={teacher} onDelete={() => deletePerson(teacher.id, "teacher")} key={teacher.id} />
                ))}
            </div>
            <div>
                <h2>Rodzice</h2>
                {parents.map((parent) => (
                    <Parent parent={parent} onDelete={() => deletePerson(parent.id,"parent")} key={parent.id} />
                ))}
            </div>
            <div>
                <h2>Uczniowie</h2>
                {students.map((student) => (
                    <Student student={student} onDelete={() => deletePerson(student.id,"student")} key={student.id} />
                ))}
            </div>
            <div>
            <h2>Dodaj nauczyciela</h2>
                <form onSubmit={(e) => createPerson(e,"teacher", teacherName, teacherSurname, teacherSchool, null, teacherUsername, teacherPassword)}>
                    <label htmlFor="teacherName">Imię: </label>
                    <input
                        type="text"
                        id="teacherName"
                        name="teacherName"
                        required
                        onChange={(e) => setTeacherName(e.target.value)}
                        value={teacherName}
                    />
                    <br/>
                    <label htmlFor="teacherSurname">Nazwisko: </label>
                    <input
                        type="text"
                        id="teacherSurname"
                        name="teacherSurname"
                        required
                        onChange={(e) => setTeacherSurname(e.target.value)}
                        value={teacherSurname}
                    />
                    <br/>
                    <label htmlFor="teacherSchool">Szkoła: </label>
                    <select
                        id="school-select"
                        onChange={(e) => setTeacherSchool(e.target.value)}
                        value={teacherSchool}
                    >
                        <option value="">-- Wybierz szkołę --</option>
                        {schools.map((school) => (
                            <option key={school.id} value={school.id}>
                                {school.name}
                            </option>
                        ))}
                    </select>
                    <br/><br/>
                    <label htmlFor="teacherUsername">Nazwa użytkownika: </label>
                    <input
                        type="text"
                        id="teacherUsername"
                        name="teacherUsername"
                        required
                        onChange={(e) => setTeacherUsername(e.target.value)}
                        value={teacherUsername}
                    />
                    <br/>
                    <label htmlFor="teacherPassword">Hasło: </label>
                    <input
                        type="password"
                        id="teacherPassword"
                        name="teacherPassword"
                        required
                        onChange={(e) => setTeacherPassword(e.target.value)}
                        value={teacherPassword}
                    />
                    <br/>
                    <input type="submit" value="Dodaj nauczyciela"></input>
                </form>
            </div>
            <div>
                <h2>Dodaj ucznia</h2>
                <form onSubmit={(e) => createPerson(e,"student", studentName, studentSurname, studentSchool, parentsID)}>
                    <label htmlFor="studentName">Imię: </label>
                    <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        required
                        onChange={(e) => setStudentName(e.target.value)}
                        value={studentName}
                    />
                    <br/>
                    <label htmlFor="studentSurname">Nazwisko: </label>
                    <input
                        type="text"
                        id="studentSurname"
                        name="studentSurname"
                        required
                        onChange={(e) => setStudentSurname(e.target.value)}
                        value={studentSurname}
                    />
                    <br/>
                    <label htmlFor="studentSchool">Szkoła: </label>
                    <select
                        id="school-select"
                        onChange={(e) => setStudentSchool(e.target.value)}
                        value={studentSchool}
                    >
                        <option value="">-- Wybierz szkołę --</option>
                        {schools.map((school) => (
                            <option key={school.id} value={school.id}>
                                {school.name}
                            </option>
                        ))}
                    </select>
                    <br/><br/>
                    <label htmlFor="parentsID">Identyfikator rodzica: </label>
                    <input
                        type="number"
                        id="parentsID"
                        name="parentsID"
                        onChange={(e) => setParentsID(e.target.value)}
                        value={parentsID}
                    />
                    <br/>
                    <input type="submit" value="Dodaj ucznia"></input>
                </form>
            </div>
        </div>
    )

}

export default Admin;