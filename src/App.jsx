import { useState } from 'react'
import initialMoviesList from './assets/data/movies-list.js'

export default function App() {
const [moviesList, setMoviesList]= useState(initialMoviesList);
  return (
    <>
      <ul className='list-group'>
        {
          moviesList.map((movie, index) => (
            <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>{movie.title} <span>{movie.genre}</span></li>
          ))
        }
      </ul>
    </>
  )
}

