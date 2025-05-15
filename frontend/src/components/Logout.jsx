import React from "react";
import {useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div>
            <button className="logout-button" onClick={() => {handleLogout()}}>
                Wyloguj
            </button>
        </div>
    )
}

export default Logout;