import MovieGrid from '../components/MovieGrid';
// 1. Import the custom hook to use the Movie context
import { useMovieList } from '../context/MovieContext';

function WatchList() {
  // 2. Use the custom hook to access the MovieList from context
  const { movieList } = useMovieList();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you are planning to watch later</p>
      {/*3. Pass the movieList as a prop*/}
      </div>
      {movieList.length > 0 ? (
        <MovieGrid movies={movieList} />
      ) : (
        <div className="empty-state">
          <p>No movies in your watch list yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default WatchList;