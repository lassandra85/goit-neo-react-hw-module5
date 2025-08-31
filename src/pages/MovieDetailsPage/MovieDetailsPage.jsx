import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdbApi';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        ← Go back
      </Link>

      <div className={styles.details}>
        <img src={posterUrl} alt={movie.title} className={styles.poster} />

        <div className={styles.info}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <p>Overview: {movie.overview}</p>
          <p>Genres: {movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />
      <p>Additional information</p>
      <ul className={styles.links}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <hr />

      <Outlet />
    </div>
  );
}
