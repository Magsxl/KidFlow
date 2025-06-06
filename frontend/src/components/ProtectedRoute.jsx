import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants";
import {useState, useEffect} from "react";

function ProtectedRoute({children, onlyStaff = false}) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [unauthorizedReason, setUnauthorizedReason] = useState("");

    useEffect(() => {
        auth().catch(() => {
            setUnauthorizedReason("Błąd autoryzacji.");
            setIsAuthorized(false);
        });
    }, [])

    const refreshToken = async () => {
        const refreshToken = await jwtDecode(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setUnauthorizedReason("Sesja wyagasła. Zaloguj się ponownie.")
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setUnauthorizedReason("Błąd odświeżania tokena.");
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setUnauthorizedReason("Brak tokena. Zaloguj się.")
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        // const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
            await refreshToken();
        } else {
            if (onlyStaff && !decoded.is_staff) {
                setUnauthorizedReason("Brak uprawnień administratora. Spróbuj ponownie.")
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        }
        // if (tokenExpiration < now) {
        //     await refreshToken();
        // } else {
        //     setIsAuthorized(true);
        // }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? (
        children
    ) : (
        <div style={{ paddingTop: "2rem", textAlign: "center", color: "red" }}>
            <p>{unauthorizedReason || "Nieautoryzowany dostęp."}</p>
            <Navigate to="/login" replace state={{ message: unauthorizedReason || "Nieautoryzowany dostęp." }}/>;
        </div>
    );
}

export default ProtectedRoute;