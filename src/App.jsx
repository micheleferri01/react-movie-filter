import { useEffect, useState } from 'react';
import initialMoviesList from './assets/data/movies-list.js';
import { genreList } from './assets/data/genre-list.js';
import MovieTitleInput from './components/MovieTitleInput.jsx';
import MovieGenreSelector from './components/MovieGenreSelector.jsx';
import ListGenerator from './components/ListGenerator.jsx';

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
    <header className='text-bg-dark'>
      <div className="container py-4">
        <h1 className='text-center'>Movies list</h1>
      </div>
    </header>

    <div className='sticky-top'>
        <div className="container d-flex justify-content-end py-3 border-bottom">
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
                  <form onSubmit={(e) => handleFormAddMovie(e)} className='d-flex flex-column gap-3'>
                    <MovieTitleInput inputController={movieTitleInput} onSetInputController={setMovieTitleInput} inputIdentifier={'movie-title-input'} labelForInput={'Movie title'} inputPlaceHolder={'Insert movie title'} />

                    <MovieGenreSelector inputController={genreInput} onSetInputController={setGenreInput} inputIdentifier={'genre-input'} labelForInput={'Genre'} optionArray={genreList} />

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
          <div className='my-3'>
            <div className="row align-items-center">
              <div className="col">
                <MovieTitleInput inputController={filterMoviesTitle} onSetInputController={setFilterMoviesTitle} inputIdentifier={'filter-movie-titles'} labelForInput={'Filter movies by title'} inputPlaceHolder={'Insert movie title'} />
              </div>
              <div className="col">
                <MovieGenreSelector inputController={filteredGenre} onSetInputController={setFilteredGenre} inputIdentifier={'genre-filter'} labelForInput={'Filter by genre'} optionArray={genreList} />
              </div>
            </div>
          </div>
        </div>
    </div>
      <ListGenerator listToGenerate={filteredMoviesList}/>
    </>
  )
}

