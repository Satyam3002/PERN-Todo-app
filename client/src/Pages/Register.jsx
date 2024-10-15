import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Register({ setUser }) {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
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
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <label className="block mb-4">
            <span className="text-gray-700">Username</span>
            <input
              required
              type="text"
              placeholder="e.g. John Doe"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              required
              type="email"
              placeholder="example@gmail.com"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Password</span>
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
          <p className="text-center mb-4">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login Here.
            </Link>
          </p>
          <button className="w-full bg-green-500 text-white rounded-md py-2 hover:bg-green-600 transition" type="submit">
            Create an account
          </button>
        </form>
      </div>
    </section>
  );
}
