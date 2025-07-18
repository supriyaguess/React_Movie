import { createContext, useState, useContext, useEffect, useMemo } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("favorite");
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (err) {
      console.error("Failed to parse localStorage:", err);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = useMemo(() => ({
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }), [favorites]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
