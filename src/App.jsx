import { useEffect, useState } from 'react'
import initialMoviesList from './assets/data/movies-list.js'
import { genreList } from './assets/data/genre-list.js';

export default function App() {
  const [moviesList, setMoviesList] = useState(initialMoviesList);
  const [filteredGenre, setFilteredGenre] = useState('');
  const [filterMoviesTitle, setFilterMoviesTitle] = useState('');
  const [filteredMoviesList, setFilteredMoviesList] = useState(moviesList);

  // handles the filter list by Genre
  useEffect(
    () => {
      const updatedFilteredMoviesList = filteredMoviesList.filter((movie) => {
        return movie.genre.toLowerCase().trim().includes(filteredGenre.toLowerCase().trim())});
      setFilteredMoviesList(updatedFilteredMoviesList.length > 0 ? updatedFilteredMoviesList : moviesList);
    }, [filteredGenre]
  )

  // handles the filter list by Movie Title
  useEffect(
    () => {
      const updatedFilteredMoviesList = filteredMoviesList.filter((movie) => movie.title.toLowerCase().trim().includes(filterMoviesTitle.toLowerCase().trim()));
      setFilteredMoviesList(updatedFilteredMoviesList.length > 0 ? updatedFilteredMoviesList : moviesList);
    }, [filterMoviesTitle]
  )

  return (
    <>
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center my-3'>
          <input value={filterMoviesTitle} onChange={(e) => setFilterMoviesTitle(e.target.value)} type="text" name='movie title' id='movie-title'/>
          <select value={filteredGenre} onChange={(e) => setFilteredGenre(e.target.value)} name='genre' id='genre'>
            <option value="">Seleziona</option>
            {
              genreList.map((genre, index) => <option key={index} value={genre.toLowerCase()}>{genre}</option>)
            }

          </select>
        </div>

      </div>
      <div className='container'>
        <ul className='list-group'>
          {
            filteredMoviesList.map((movie, index) => (
              <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>{movie.title} <span>{movie.genre}</span></li>
            ))
          }
        </ul>
      </div>

    </>
  )
}

