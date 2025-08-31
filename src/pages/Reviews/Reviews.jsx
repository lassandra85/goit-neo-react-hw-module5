import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/tmdbApi';
import styles from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews).catch(console.error);
  }, [movieId]);

  if (!reviews.length) return <p>No reviews found</p>;

  return (
    <ul className={styles.list}>
      {reviews.map(r => (
        <li key={r.id} className={styles.item}>
          <h4>{r.author}</h4>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
