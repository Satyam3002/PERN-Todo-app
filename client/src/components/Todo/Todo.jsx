import React, { useEffect, useState } from "react";
import SingleTodo from "../SingleTodo/SingleTodo";
import { getTodos } from "../../utils/getTodos";
import { postTodo } from "../../utils/postTodo";
import { useNavigate } from "react-router";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const description = new FormData(e.target).get("description");
    const [response] = await postTodo(description);
    delete response.user_id;
    const updatedTodo = [...todos, response];
    console.log(updatedTodo);
    setTodos(updatedTodo);
    e.target.reset();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form className="flex items-center mb-4" onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Enter todo"
          name="description"
          className="flex-1 border border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          ADD
        </button>
      </form>

      <div className="all-todos">
        <h3 className="text-xl font-semibold mb-2">All Todos</h3>
        <div className="todos space-y-4">
          {todos &&
            todos.map((todo) => (
              <SingleTodo key={todo.id} todo={todo} setTodos={setTodos} />
            ))}
        </div>
      </div>
    </div>
  );
}
