export const deleteTodo = async (id) => {
    const apiUrl = process.env.REACT_APP_API_URL; // Access the API URL from the environment variable
    try {
        const response = await fetch(`${apiUrl}/todos/${id}`, { // Use apiUrl for the delete request
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        });
        if (!response.ok) throw new Error("Delete todo failed");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
