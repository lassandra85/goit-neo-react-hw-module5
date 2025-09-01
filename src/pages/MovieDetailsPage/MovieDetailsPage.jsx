import { useState, useEffect, Suspense, useRef } from 'react';
import { NavLink, Link, useParams, useLocation, Outlet } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { fetchMovieDetails, IMAGE_BASE_URL } from '../../servives/TMDB-api.js';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage text="Whoops, something went wrong! Please try again!" />;
  if (!movie) return <ErrorMessage text="Movie not found!" />;

  return (
    <div className={css.container}>
      <Link to={goBackRef.current} className={css.link}>
        &larr; Go back
      </Link>
      <div className={css.details}>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : 'https://placehold.co/300x450/cccccc/333333?text=No+Image'
          }
          alt={movie.title}
          width={300}
        />
        <div className={css.description}>
          <h2>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>User score: {movie.vote_average.toFixed(1) * 10}%</p>
          <h3>Overview</h3>
          <p>{movie.overview || 'No overview.'}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <hr />

      <div>
        <h3>Additional information</h3>
        <nav>
          <ul className={css.list}>
            <li>
              <NavLink to="cast" className={css.addinional_link}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={css.addinional_link}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </nav>

        <hr />

        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
