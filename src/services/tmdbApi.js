import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjRjNjE5MjU2OWM3NjhjYzRmOTAwYjNjNDNlYTczNSIsIm5iZiI6MTY3ODgzODUwOC4yMiwic3ViIjoiNjQxMTBhZWMxNzZhOTQwMGYzYzMwNGI1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.b0bhIS71vGXgix2WKbHi_fYurA_h6Cm14y11y6Qhd60';

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export const getTrendingMovies = async () => {
  const { data } = await tmdb.get('/trending/movie/day');
  return data.results;
};

export const searchMovies = async query => {
  const { data } = await tmdb.get('/search/movie', {
    params: { query },
  });
  return data.results;
};

export const getMovieDetails = async id => {
  const { data } = await tmdb.get(`/movie/${id}`);
  return data;
};

export const getMovieCredits = async id => {
  const { data } = await tmdb.get(`/movie/${id}/credits`);
  return data.cast;
};

export const getMovieReviews = async id => {
  const { data } = await tmdb.get(`/movie/${id}/reviews`);
  return data.results;
};
