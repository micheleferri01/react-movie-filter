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

  const [movieTitleInput, setMovieTitleInput] = useState('');

  const [genreInput, setGenreInput] = useState('');


  // handles the filters
  useEffect(
    () => {
      let updatedFilteredMoviesList = moviesList;

      if (filteredGenre) {
        updatedFilteredMoviesList = updatedFilteredMoviesList.filter((movie) =>
          movie.genre.toLowerCase().trim().includes(filteredGenre.toLowerCase().trim())
        );
      }

      if (filterMoviesTitle) {
        updatedFilteredMoviesList = updatedFilteredMoviesList.filter((movie) => movie.title.toLowerCase().trim().includes(filterMoviesTitle.toLowerCase().trim()));
      }

      setFilteredMoviesList(updatedFilteredMoviesList);
    }, [filteredGenre, filterMoviesTitle, moviesList]
  )

  const handleFormAddMovie = (e) => {
    e.preventDefault();
    setMoviesList([...moviesList, { title: movieTitleInput, genre: genreInput }]);
    setMovieTitleInput('');
    setGenreInput('');
  }

  return (
    <>
      <div className='container'>
        <div className='my-3'>
          <div className="row align-items-center">
            <div className="col">
              <input value={filterMoviesTitle} onChange={(e) => setFilterMoviesTitle(e.target.value)} type="text" name='movie title filter' id='filter-movie-titles' placeholder='Insert movie title' className='form-control'/>
            </div>
            <div className="col">
              <select value={filteredGenre} onChange={(e) => setFilteredGenre(e.target.value)} name='genre filter' id='genre-filter' className='form-control'>
                <option value="">Seleziona</option>
                {
                  genreList.map((genre, index) => <option key={index} value={genre}>{genre}</option>)
                }
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-end my-3">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-form">
          Add new movie
        </button>
        <div className="modal fade" id="modal-form" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add new movie</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => handleFormAddMovie(e)} className='d-flex flex-column'>
                  <div className='mb-3'>
                    <label htmlFor="movie-title-input" className='form-label'>Movie title</label>
                    <input value={movieTitleInput} onChange={(e) => setMovieTitleInput(e.target.value)} type="text" className='form-control' name='movie title input' id='movie-title-input' placeholder='insert movie title' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="genre-input" className='label-form'>Genre</label>
                    <select value={genreInput} onChange={(e) => setGenreInput(e.target.value)} name="genre input" id="genre-input" className='form-control'>
                      <option value="">Seleziona</option>
                      {
                        genreList.map((genre, index) => <option key={index} value={genre}>{genre}</option>)
                      }

                    </select>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <button className="btn btn-primary" data-bs-dismiss="modal">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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

