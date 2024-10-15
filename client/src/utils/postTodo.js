export const postTodo = async (todo) => {
    const apiUrl = process.env.REACT_APP_API_URL; // Access the API URL from the environment variable
    try {
        const response = await fetch(`${apiUrl}/todos`, { // Use apiUrl for the POST request
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ description: todo }),
        });
        if (!response.ok) throw new Error("POST todo failed");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

