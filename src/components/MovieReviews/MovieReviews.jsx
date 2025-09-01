import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovieReviews } from '../../servives/TMDB-api.js';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage text="Whoops, something went wrong! Please try again!" />;
  if (reviews.length === 0) return <ErrorMessage text="We don't have any reviews for this movie" />;

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id} className={css.list}>
          <h4 className={css.author}>Author: {review.author}</h4>
          <p>{review.content}</p>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
