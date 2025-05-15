import {useState, useEffect} from 'react';
import api from "../api";
import "../styles/Schools.css"
import Parent from "../components/Parent";

function Parents() {
    const [parents, setParent] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState("");

    useEffect(() => {
        async function fetchSchools() {
            api
                .get(`/api/school/`)
                .then((res) => {
                    setSchools(res.data); console.log(res.data);
                })
                .catch((err) => alert(err));
        }
        fetchSchools().catch((err) => alert(err));
        getParent();
    }, [])

    const getParent = () => {
        api
            .get("/api/parent/")
            .then((res) => res.data)
            .then((data) => {setParent(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteParent = (id) => {
        api
            .delete(`/api/parent/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Parent deleted successfully");
                else alert("Failed to delete parent");
                getParent();
            })
            .catch((err) => alert(err));
    };

    const createParent = (e) => {
        e.preventDefault();
        api
            .post("api/parent/", {name, surname, school: selectedSchool})
            .then((res) => {
                if (res.status === 201) alert("Parent created successfully");
                else alert("Failed to create parent");
                getParent();
            })
            .catch((err) => alert(err));
    }

    return (
        <div>
            <div>
                <h2>Parents</h2>
                {parents.map((parent) => (
                    <Parent parent={parent} onDelete={deleteParent} key={parent.id} />
                ))}
            </div>
            <h2>Add parent</h2>
            <form onSubmit={createParent}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <br/>
                <label htmlFor="surname">Surname: </label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    required
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />
                <br/>
                <label htmlFor="school">School: </label>
                <select
                    id="school-select"
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    value={selectedSchool}
                >
                    <option value="">-- Wybierz szkołę --</option>
                    {schools.map((school) => (
                        <option key={school.id} value={school.id}>
                            {school.name}
                        </option>
                    ))}
                </select>
                <input type="submit" value="Add parent"></input>
            </form>
        </div>
    )
}

export default Parents