import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-meta">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>
          <p>{movie.release_date}</p>
          <p className="movie-language">🌍 Language: {movie.original_language?.toUpperCase()}</p>
          {movie.vote_count !== undefined && (
            <p className="movie-votes">🗳️ Votes: {movie.vote_count}</p>
          )}
          {movie.popularity !== undefined && (
            <p className="movie-popularity">🔥 Popularity: {Math.round(movie.popularity)}</p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
