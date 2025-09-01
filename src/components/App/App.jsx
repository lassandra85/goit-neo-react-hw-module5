import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navigation from '../Navigation/Navigation';
import Loader from '../Loader/Loader';
import './App.css';

function App() {
  const LazyHomePage = lazy(() => import('../../pages/HomePage/HomePage'));
  const LazyMoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
  const LazyMovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
  const LazyMovieCast = lazy(() => import('../MovieCast/MovieCast'));
  const LazyMovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
  const LazyNotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LazyHomePage />} />
          <Route path="/movies" element={<LazyMoviesPage />} />
          <Route path="/movies/:movieId" element={<LazyMovieDetailsPage />}>
            <Route path="cast" element={<LazyMovieCast />} />
            <Route path="reviews" element={<LazyMovieReviews />} />
          </Route>
          <Route path="*" element={<LazyNotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
