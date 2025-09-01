import { useEffect, useState } from 'react';
import { getMovieCast } from '../../services/tmdbApi';
import css from './Cast.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getMovieCast(movieId);
      setCast(data);
    }
    fetchData();
  }, [movieId]);

  if (cast === null) return <p>Loading cast...</p>;
  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul className={css.list}>
      {cast.map(actor => (
        <li key={actor.id} className={css.item}>
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={css.photo}
            />
          )}
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
