import "./MovieDetail.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "93979f2ef5213e69984d6a7ebfbc8b85"; // 🎯 Replace with your key
const IMG_URL = "https://image.tmdb.org/t/p/";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const urls = [
        `/movie/${id}`,
        `/movie/${id}/credits`,
        `/movie/${id}/videos`,
        `/movie/${id}/reviews`,
        `/movie/${id}/keywords`,
        `/movie/${id}/similar`,
      ];
      const [m, c, v, r, k, s] = await Promise.all(
        urls.map(u =>
          fetch(`https://api.themoviedb.org/3${u}?api_key=${API_KEY}&language=en-US`)
        )
      );
      setMovie(await m.json());
      setCredits(await c.json());
      setVideos((await v.json()).results);
      setReviews((await r.json()).results);
      setKeywords((await k.json()).keywords);
      setSimilar((await s.json()).results);
    }
    fetchAll();
  }, [id]);

  if (!movie || !credits) return <div className="loading">Loading...</div>;

  const trailer = videos.find(v => v.type === "Trailer");
  const director = credits.crew.find(c => c.job === "Director");
  const writer = credits.crew.find(c => ["Writer", "Screenplay"].includes(c.job));
  const producers = credits.crew.filter(c => c.job === "Producer").slice(0, 2);
  const cast = credits.cast.slice(0, 6);

  return (
    <div className="movie-detail">
      <header className="header">
        <img
          src={`${IMG_URL}w500${movie.poster_path}`}
          alt={movie.title}
          className="poster"
        />
        <div className="main-info">
          <h1>
            {movie.title} <span>({movie.release_date?.slice(0, 4)})</span>
          </h1>
          {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
          <ul className="stats">
            <li><strong>Release Date:</strong> {movie.release_date}</li>
            <li><strong>Status:</strong> {movie.status}</li>
            <li><strong>Runtime:</strong> {movie.runtime} min</li>
            <li><strong>Rating:</strong> ⭐ {movie.vote_average} ({movie.vote_count} votes)</li>
            <li><strong>Budget:</strong> ${movie.budget.toLocaleString()}</li>
            <li><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</li>
          </ul>
          <ul className="tags">
            <li><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</li>
            <li><strong>Languages:</strong> {movie.spoken_languages.map(l => l.english_name).join(", ")}</li>
            <li><strong>Countries:</strong> {movie.production_countries.map(c => c.name).join(", ")}</li>
          </ul>
          <ul className="crew">
            {director && <li><strong>Director:</strong> {director.name}</li>}
            {writer && <li><strong>Writer:</strong> {writer.name}</li>}
            {producers.length > 0 && <li><strong>Producers:</strong> {producers.map(p => p.name).join(", ")}</li>}
            {movie.homepage && (
              <li>
                <strong>Website:</strong>{" "}
                <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                  Official Site
                </a>
              </li>
            )}
            {movie.imdb_id && (
              <li>
                <strong>IMDb:</strong>{" "}
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
                  View on IMDb
                </a>
              </li>
            )}
          </ul>
        </div>
      </header>

      <section className="overview">
        <h2>Overview</h2>
        <p>{movie.overview}</p>
      </section>

      <section className="media">
        {trailer && (
          <div className="trailer">
            <h2>Trailer</h2>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        )}
      </section>

      <section className="cast-section">
        <h2>Top Cast</h2>
        <div className="cast-list">
          {cast.map(a => (
            <Link to={`/person/${a.id}`} key={a.id} className="cast-card">
              <img src={`${IMG_URL}w185${a.profile_path}`} alt={a.name} />
              <p>{a.name}</p>
              <small>{a.character}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="reviews-section">
        <h2>User Reviews</h2>
        {reviews.length === 0 ? <p>No reviews yet.</p> : reviews.slice(0, 3).map(r => (
          <div className="review-card" key={r.id}>
            <h4>By {r.author}</h4>
            <p>{r.content}</p>
          </div>
        ))}
      </section>

      <section className="keywords-section">
        <h2>Keywords</h2>
        <div className="keywords">
          {keywords.map(k => <span key={k.id} className="keyword">{k.name}</span>)}
        </div>
      </section>

      <section className="similar-section">
        <h2>Similar Movies</h2>
        <div className="similar-list">
          {similar.slice(0, 6).map(m => (
            <Link to={`/movie/${m.id}`} key={m.id} className="similar-card">
              <img src={`${IMG_URL}w185${m.poster_path}`} alt={m.title} />
              <p>{m.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
