import { useEffect, useState } from 'react'
import initialMoviesList from './assets/data/movies-list.js'
import { genreList } from './assets/data/genre-list.js';

export default function App() {
  // da la lista dei movies
  const [moviesList, setMoviesList] = useState(initialMoviesList);

  // da il genre per cui filtrare la lista die Movies
  const [filteredGenre, setFilteredGenre] = useState('');

  // da il titolo per cui filtrare la lista dei Movies
  const [filterMoviesTitle, setFilterMoviesTitle] = useState('');

  // da la lista dei Movies filtrata
  const [filteredMoviesList, setFilteredMoviesList] = useState(moviesList);

 
  // handles the filters
  useEffect(
    () => {
      let updatedFilteredMoviesList = moviesList;

      if(filteredGenre){
         updatedFilteredMoviesList = updatedFilteredMoviesList.filter((movie) =>
      movie.genre.toLowerCase().trim().includes(filteredGenre.toLowerCase().trim())
      );
      }
      
      if(filterMoviesTitle){
        updatedFilteredMoviesList = updatedFilteredMoviesList.filter((movie) => movie.title.toLowerCase().trim().includes(filterMoviesTitle.toLowerCase().trim()));
      }

      setFilteredMoviesList(updatedFilteredMoviesList);
    }, [filteredGenre,filterMoviesTitle, moviesList]
  )

  return (
    <>
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center my-3'>
          <input value={filterMoviesTitle} onChange={(e) => setFilterMoviesTitle(e.target.value)} type="text" name='movie title filter' id='filter-movie-titles' />
          <select value={filteredGenre} onChange={(e) => setFilteredGenre(e.target.value)} name='genre filter' id='genre-filter'>
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

