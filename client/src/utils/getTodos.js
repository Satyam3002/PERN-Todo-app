export const getTodos = async () => {
    const apiUrl = process.env.REACT_APP_API_URL; // Access the API URL from the environment variable
    try {
        const response = await fetch(`${apiUrl}/todos`, { // Use apiUrl for the GET request
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Fetch todos failed");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
