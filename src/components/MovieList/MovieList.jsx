import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <ul className={styles.list}>
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </ul>
  );
}
