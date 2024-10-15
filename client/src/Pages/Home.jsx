import React from "react";
import Cookies from "js-cookie";
import Todo from "../components/Todo/Todo";
import { useNavigate } from "react-router-dom";

export default function Home({ user }) {
  const redirect = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    redirect("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Welcome {user?.name}</h2>
        <button
          className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center py-10">
        <h1 className="text-3xl font-bold mb-6">This is some todo app</h1>
        <Todo />
      </main>
    </div>
  );
}
