import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={css.container}>
    <h1>404</h1>
    <p className={css.text}>No page found.</p>
    <Link className={css.link} to="/">
      Get back to home page
    </Link>
  </div>
);

export default NotFoundPage;
