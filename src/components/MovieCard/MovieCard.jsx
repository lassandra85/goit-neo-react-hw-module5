import { Link, useLocation } from 'react-router-dom';
import css from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const location = useLocation();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.card}>
      <img src={posterUrl} alt={movie.title} className={css.poster} />
      <h3 className={css.title}>{movie.title}</h3>
    </Link>
  );
}
