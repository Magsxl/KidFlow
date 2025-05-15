import Form from "../components/Form";
import Register from "../components/Register";

function Login() {
    return (
        <div>
            <Register />
            <Form route="/api/token/" method="login" />
        </div>
    )
}

export default Login