import {useState, useEffect} from "react";
import api from "../api"
import {useLocation, useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator.jsx";
import {jwtDecode} from "jwt-decode";

function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate  = useNavigate();
    const location = useLocation();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password})
            if (method === "login") {
                const access = res.data.access;
                const refresh = res.data.refresh;

                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);

                const decoded = jwtDecode(access)

                if (decoded.is_staff) {
                    navigate("/admin")
                } else {
                    navigate("/")
                }
            } else {
                navigate("/login");
            }
        } catch (error) {
            if (error.response.status === 401) {
                setMessage("Konto z podanymi danymi nie istnieje. Spróbuj ponownie.")
            } else alert(error);
        } finally {
            setLoading(false);
        }
    }

    const isFormValid = username.trim() !== "" && password.trim() !== "";

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);

            navigate(location.pathname, {replace: true, state: {}})
        }
    }, [location, navigate])

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <div style={{ textAlign: "center" }}>
            {message && (
                <div style={{ color: "red", marginBottom: "1rem", marginTop: "1rem" }}>
                    {message}
                </div>
            )}
        </div>
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit" disabled={!isFormValid}>
            {name}
        </button>
    </form>
}

export default Form;