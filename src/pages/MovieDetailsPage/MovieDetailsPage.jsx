import { useEffect, useState, useRef } from 'react';
import { useParams, Link, NavLink, Routes, Route, useLocation } from 'react-router-dom';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import { getMovieDetails } from '../../services/tmdbApi';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className={css.container}>
      <Link to={backLink.current} className={css.back}>
        Go back
      </Link>
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={css.poster}
        />
      )}
      <p>{movie.overview}</p>

      <nav className={css.subNav}>
        <NavLink to="cast" className={({ isActive }) => (isActive ? css.active : css.link)}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={({ isActive }) => (isActive ? css.active : css.link)}>
          Reviews
        </NavLink>
      </nav>

      <Routes>
        <Route path="cast" element={<Cast movieId={movieId} />} />
        <Route path="reviews" element={<Reviews movieId={movieId} />} />
      </Routes>
    </div>
  );
}
