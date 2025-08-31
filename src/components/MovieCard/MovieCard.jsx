import { Link, useLocation } from 'react-router-dom';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const location = useLocation();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <li className={styles.item}>
      <Link to={`/movies/${movie.id}`} state={{ from: location }} className={styles.link}>
        <img src={posterUrl} alt={movie.title} className={styles.img} />
        <p>{movie.title}</p>
      </Link>
    </li>
  );
}
