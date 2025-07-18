const API_KEY ="93979f2ef5213e69984d6a7ebfbc8b85";



const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.status_message}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("getPopularMovies error:", error.message);
        return [];
    }
};


export const searchMovies = async (query) => {
    
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
    )}`
);
    
    const data = await response.json();
    return data.results;
}