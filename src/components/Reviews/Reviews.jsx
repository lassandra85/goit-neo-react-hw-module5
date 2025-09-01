import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../services/tmdbApi';
import css from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getMovieReviews(movieId);
      setReviews(data);
    }
    fetchData();
  }, [movieId]);

  if (reviews === null) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(review => (
        <li key={review.id} className={css.item}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
