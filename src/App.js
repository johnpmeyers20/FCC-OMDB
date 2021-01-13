import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  const getMovieRequest = async () => {
    const url = 'http://www.omdbapi.com/?apikey=1f020500&s=star wars';
    const res = await fetch(url);
    const resJson = await res.json();

    if (resJson.Search) {
      setMovies(resJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  return (
    <div className="container-fluid fcc-omdb">
      <div className="row">
        <MovieListHeading heading='Movies' />
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default App;