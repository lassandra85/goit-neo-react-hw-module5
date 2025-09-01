import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { searchMovies } from '../../servives/TMDB-api.js';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = formData => {
    const newQuery = formData.get('query');
    if (newQuery) {
      setSearchParams({ query: newQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={css.container}>
      <form action={handleSearch}>
        <input className={css.input} type="text" name="query" placeholder="Enter movie name" />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <Loader />}
      {error && <ErrorMessage text="Whoops, something went wrong! Please try again!" />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length === 0 && query && !isLoading && <ErrorMessage text="No movies found." />}
    </div>
  );
};

export default MoviesPage;
