
import { useState, useEffect } from 'react';
import { useMovieList } from '../context/MovieContext';

function MovieCard({ movie }) {

  // 1. Use Context to manage the Watchlist
  const { addToMovieList, removeFromMovieList, isInMovieList } = useMovieList();

  const [isFavorite, setIsFavorite] = useState(false);

  // 2. Check if movie is already in Watchlist
  const inMovieList = isInMovieList(movie.id);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const isMovieFavorite = favorites.some(fav => fav.id === movie.id);
    setIsFavorite(isMovieFavorite);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  // 3. Handle adding/removing movies from Watchlist
  const handleMovieListClick = () => {
    if (inMovieList) {
      removeFromMovieList(movie.id);
    } else {
      addToMovieList(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <button 
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={toggleFavorite}>
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>

        {/* 4. Button to add/remove movie from Watchlist */}
        <button
          className={`watchlist-button ${inMovieList ? 'added' : ''}`}
          onClick={handleMovieListClick}
        >
          {inMovieList ? '✓ Remove from Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
