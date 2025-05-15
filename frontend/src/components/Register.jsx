import React from "react";
import {useNavigate} from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/register");
    }
    return (
        <div>
            <button className="register-button" onClick={() => {handleLogout()}}>
                Stwórz konto
            </button>
        </div>
    )
}

export default Register;