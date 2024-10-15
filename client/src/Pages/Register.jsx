import { useNavigate } from "react-router";
import "../assets/css/login.css";
import { Link } from "react-router-dom";

export default function Register({ setUser }) {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL; // Access the API URL from environment variable

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };
        try {
            const response = await fetch(`${apiUrl}/auth/register`, { // Use apiUrl for the register request
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            const resData = await response.json();
            if (!response.ok) throw new Error("Error in register!");
            setUser(resData.user);
            navigate("/");
            console.log(resData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="login_container">
            <div>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <label>
                        <span>Username</span>
                        <input
                            required
                            type="text"
                            placeholder="eg. John Doe"
                            name="name"
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            required
                            type="email"
                            placeholder="example@gmail.com"
                            name="email"
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            required
                            type="password"
                            placeholder="password"
                            name="password"
                        />
                    </label>
                    <p>
                        Already have an account? <Link to={"/login"}>Login Here.</Link>
                    </p>
                    <button className="btn-success" type="submit">
                        Create an account
                    </button>
                </form>
            </div>
        </section>
    );
}
