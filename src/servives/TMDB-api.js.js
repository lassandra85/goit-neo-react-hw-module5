import axios from 'axios';

const TMDB_API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjRjNjE5MjU2OWM3NjhjYzRmOTAwYjNjNDNlYTczNSIsIm5iZiI6MTY3ODgzODUwOC4yMiwic3ViIjoiNjQxMTBhZWMxNzZhOTQwMGYzYzMwNGI1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.b0bhIS71vGXgix2WKbHi_fYurA_h6Cm14y11y6Qhd60';

const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const headers = {
  Authorization: `Bearer ${TMDB_API_KEY}`,
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers,
  });
  return response.data;
};

export const searchMovies = async query => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { query },
    headers,
  });
  return response.data;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, { headers });
  return response.data;
};

export const fetchMovieCast = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers,
  });
  return response.data;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers,
  });
  return response.data;
};
