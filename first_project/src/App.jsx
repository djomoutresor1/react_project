import Search from './components/search.jsx'
import { useState, useEffect } from 'react'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.response === 'False') {
        setErrorMessage(DataTransfer.Error || 'Movie not found');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []);


  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="../src/assets/hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-white'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie = {movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>

  )
}

export default App