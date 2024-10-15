
export const updateTodo = async (todo) => {
    const apiUrl = process.env.REACT_APP_API_URL; // Access the API URL from the environment variable
    try {
        const response = await fetch(`${apiUrl}/todos/${todo.id}`, { // Use apiUrl for the PUT request
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(todo),
        });
        if (!response.ok) throw new Error("Update todo failed");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
