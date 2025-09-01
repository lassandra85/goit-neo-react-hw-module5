import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { IMAGE_BASE_URL, fetchMovieCast } from '../../servives/TMDB-api.js';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage text="Whoops, something went wrong! Please try again!" />;
  if (cast.length === 0) return <ErrorMessage text="No cast info." />;

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.id} className={css.card}>
          <img
            src={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${actor.profile_path}`
                : 'https://placehold.co/120x150/cccccc/333333?text=No+Image'
            }
            alt={actor.name}
            width={100}
          />
          <div>
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
