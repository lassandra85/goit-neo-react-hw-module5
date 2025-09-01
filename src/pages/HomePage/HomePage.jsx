import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getTrendingMovies();
      setMovies(data);
    }
    fetchData();
  }, []);

  return (
    <div className={css.container}>
      <h2>Trending Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
}
