
import { createContext, useState, useContext, useEffect } from "react"; 

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorite, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorite")
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs))
        }
    }, [])
      useEffect(() => {
        localStorage.setItem("favorite", JSON.stringify(favorite))
      }, [favorite])

      const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
      };

      const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
        }
        const isFavorite = (movieId) => {
          return favorite.some((movie) => movie.id === movieId);
        };

    const value = {
        favorite,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <MovieContext.Provider value ={value}>
    {children}
    </MovieContext.Provider>
}