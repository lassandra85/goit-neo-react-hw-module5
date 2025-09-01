import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h2>Page Not Found</h2>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
