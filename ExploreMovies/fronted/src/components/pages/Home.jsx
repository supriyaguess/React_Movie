import MovieCard from "../MovieCard";
import { useState, useEffect } from "react"; 
 import {searchMovies, getPopularMovies} from "../../services/api";  
import "../../css/Home.css";


function Home() {
    const [searchQuerry, setSearchQuery] = useState("");

    const [movies,setMovies] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch (err) {
          console.log(err)
          setError("Failed to fetch popular movies...");
          console.error(err);
        }
         finally{
          setLoading(false)
         }
      }

      loadPopularMovies()
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuerry.trim()) return;
        if(loading) return; // Prevent search while loading

        setLoading(true)
        try {
          const searchResults = await searchMovies(searchQuerry);
          setMovies(searchResults);
          setError(null);
         } catch (err) {
          console.log(err)
          setError("Failed to  search movies...");
         } finally {
          setLoading(false);
        }
    };
  return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
               type="text"
               placeholder="Search for movies..." 
               className="search-input" 
               value={searchQuerry}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>
        
        {error && <div className="error">{error}</div>  }
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
           <div className="movie-grid">
        {movies.map(
          (movie) =>  
          (
            <MovieCard movie = {movie} key={movie.id} />
          )
      )}
      </div>
     ) }
      
    </div>
  );
}

export default Home;