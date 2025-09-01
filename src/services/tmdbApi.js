import axios from 'axios';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjRjNjE5MjU2OWM3NjhjYzRmOTAwYjNjNDNlYTczNSIsIm5iZiI6MTY3ODgzODUwOC4yMiwic3ViIjoiNjQxMTBhZWMxNzZhOTQwMGYzYzMwNGI1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.b0bhIS71vGXgix2WKbHi_fYurA_h6Cm14y11y6Qhd60';

const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export async function getTrendingMovies() {
  try {
    const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

export async function searchMovies(query) {
  try {
    const res = await axios.get(
      `${BASE_URL}/search/movie?query=${query}&include_adult=false`,
      options
    );
    return res.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

export async function getMovieDetails(id) {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, options);
    return res.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export async function getMovieCast(id) {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
    return Array.isArray(res.data.cast) ? res.data.cast : [];
  } catch (error) {
    console.error('Error fetching cast:', error);
    return [];
  }
}

export async function getMovieReviews(id) {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
    return Array.isArray(res.data.results) ? res.data.results : [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}
