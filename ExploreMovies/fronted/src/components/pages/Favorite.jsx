import "../../css/Favorites.css";
// import { useMovieContext } from "../components/MovieCard"; 
// import { useMovieContext } from "../MovieCard"
import { useMovieContext } from "../../contexts/MovieContext";
import MovieCard from "../MovieCard";

function Favorite() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movie-grid">
          {favorites.map(
            (movie) =>
            (
              <MovieCard movie={movie} key={movie.id} />
            )
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="favorite-empty">
      <h2> No Favorite Movies yet</h2>
      <p>Start adding movies to your favorites and they will appear here</p>
    </div>
  );
}

export default Favorite;