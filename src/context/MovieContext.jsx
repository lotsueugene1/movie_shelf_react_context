import { createContext, useState, useContext } from 'react';

// 1. Create the Context
const MovieListContext = createContext();

// 2. Create a custom hook for consuming the Context
export function useMovieList() {
  const context = useContext(MovieListContext);
  if (!context) {
    throw new Error('useMovieList must be used within MovieListProvider');
  }
  return context;
};

// 3. Create the Provider component
export function MovieListProvider({ children }) {
  const [movieList, setMovieList] = useState([]);

  const addToMovieList = (movie) => {
    if (!movieList.some(r => r.id === movie.id)) {
      setMovieList(prev => [...prev, movie]);
    }
  };

  const removeFromMovieList = (movieId) => {
    setMovieList(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInMovieList = (movieId) => {
    return movieList.some(movie => movie.id === movieId);
  };

  const value = {
    movieList,
    addToMovieList,
    removeFromMovieList,
    isInMovieList
  };

  return (
    <MovieListContext.Provider value={value}>
      {children}
    </MovieListContext.Provider>
  );
};