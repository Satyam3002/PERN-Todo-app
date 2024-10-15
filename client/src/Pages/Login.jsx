import { useNavigate } from "react-router-dom"; // Ensure you're importing from the right package
import "../assets/css/login.css"; // Make sure this path is correct
import { Link } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      console.log(resData);
      if (!response.ok) throw new Error("Error in login!");
      setUser(resData.user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="block mb-4">
            <span className="block text-sm font-medium mb-1">Email</span>
            <input
              required
              type="email"
              placeholder="example@gmail.com"
              name="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium mb-1">Password</span>
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <p className="text-center mb-4">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register Here.</Link>
          </p>
          <button className="bg-blue-500 text-white rounded px-4 py-2 w-full hover:bg-blue-600 transition" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
