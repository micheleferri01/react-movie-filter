import { useEffect, useState } from 'react'
import initialMoviesList from './assets/data/movies-list.js'
import { genreList } from './assets/data/genre-list.js';

export default function App() {
  const [moviesList, setMoviesList] = useState(initialMoviesList);
  const [filteredGenre, setFilteredGenre] = useState('');
  const [filteredMoviesList, setFilteredMoviesList] = useState(moviesList)

  useEffect(
    () => {
      const updatedFilteredMoviesList = moviesList.filter((movie) => movie.genre.toLowerCase().includes(filteredGenre.toLowerCase()));
      setFilteredMoviesList(updatedFilteredMoviesList.length === 0? moviesList : updatedFilteredMoviesList);
    }, [filteredGenre]
  )
  return (
    <>
      <div className='my-3'>
        <select value={filteredGenre} onChange={(e)=> setFilteredGenre(e.target.value)} name='genre' id='genre'>
          <option value="seleziona">Seleziona</option>
          {
            genreList.map((genre, index) => <option key={index} value = {genre.toLowerCase()}>{genre}</option>)
          }

        </select>
      </div>
      <ul className='list-group'>
        {
          filteredMoviesList.map((movie, index) => (
            <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>{movie.title} <span>{movie.genre}</span></li>
          ))
        }
      </ul>
    </>
  )
}

