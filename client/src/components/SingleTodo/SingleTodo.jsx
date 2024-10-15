import React, { useRef, useState } from "react";
import { updateTodo } from "../../utils/updateTodo";
import { deleteTodo } from "../../utils/deleteTodo";

export default function SingleTodo({ todo, setTodos }) {
  const model = useRef(null);
  const [updatedTodo, setUpdatedTodo] = useState(todo.description);

  const handleUpdateTodo = async () => {
    const data = { ...todo, description: updatedTodo };
    const res = await updateTodo(data);
    setTodos((prevData) =>
      prevData.map((t) => {
        if (t.id === todo.id) {
          return { ...t, description: updatedTodo };
        } else {
          return t;
        }
      })
    );
    model.current.close();
  };

  const deleteTodoHandler = async () => {
    const res = await deleteTodo(todo.id);
    setTodos((prevData) =>
      prevData.filter((t) => t.id !== todo.id)
    );
    console.log(res);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4">
        <p className="text-gray-700">{todo.description}</p>
        <div>
          <button
            onClick={() => model.current.showModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition ml-2"
            onClick={deleteTodoHandler}
          >
            Delete
          </button>
        </div>
      </div>

      <dialog ref={model} className="modal">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Update Todo!</h2>
            <button
              onClick={() => model.current.close()}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter todo"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={handleUpdateTodo}
            >
              Update
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
