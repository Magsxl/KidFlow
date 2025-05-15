import {useState, useEffect} from "react";
import api from "../api"
import "../styles/Schools.css";
import School from "../components/School"
import Logout from "../components/Logout.jsx";

function Schools() {
    const [schools, setSchool] = useState([]);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        getSchool();
    }, [])

    const getSchool = () => {
        api
            .get("/api/school/")
            .then((res) => res.data)
            .then((data) => {setSchool(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteSchool = (id) => {
        api
            .delete(`/api/school/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("School deleted successfully");
                else alert("Failed to delete school");
                getSchool();
            })
            .catch((err) => alert(err));
    };

    const createSchool = (e) => {
        e.preventDefault();
        api
            .post("/api/school/", { name, city })
            .then((res) => {
                if (res.status === 201) alert("School added successfully");
                else alert("Failed to add school");
                getSchool();
            })
            .catch((err) => alert(err));
    }

    return (
        <div>
            <Logout />
            <div>
                <h2>Schools</h2>
                {schools.map((school) => (
                    <School school={school} onDelete={deleteSchool} key={school.id} />
                ))}
            </div>
            <h2>Add school</h2>
            <form onSubmit={createSchool}>
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
                <label htmlFor="city">City: </label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                />
                <br/><br/>
                <input type="submit" value="Add School"></input>
            </form>
        </div>
    );
}

export default Schools;