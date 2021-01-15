import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavorites from './components/AddToFavorites';
import RemoveFromFavorites from './components/RemoveFromFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?apikey=1f020500&s=${searchValue}`;
    const res = await fetch(url);
    const resJson = await res.json();

    console.log("We're here now!");

    if (resJson.Search) {
      setMovies(resJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const favoriteMovies = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    setFavorites(favoriteMovies);
    // setFavorites(JSON.parse(localStorage.getItem('react-movie-app-favorites')));
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  }

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID);
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  return (
    <div className="container-fluid fcc-omdb">

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="row">
        <MovieList
          movies={movies}
          favoriteComponent={AddToFavorites}
          handleFavoritesClick={addFavoriteMovie}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>

      <div className="row">
        <MovieList movies={favorites} handleFavoritesClick={removeFavoriteMovie} favoriteComponent={RemoveFromFavorites} />
      </div>
    </div>
  );
};

export default App;