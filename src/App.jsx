import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';
import { useState } from 'react';
import { searchMovies } from './services/movieService';
import { MovieListProvider } from './context/MovieContext';
import Watchlist from './pages/Watchlist';

function App() {

    // Create search state
  const [searchResults, setSearchResults] = useState(null); 
  // Handler function to query search
  const handleSearch = async (query) => { 
    const results = await searchMovies(query); 
    setSearchResults(results); 
  }; 


  return (

    <MovieListProvider>
    <Router>
      <div className="app">
         <Header onSearch={handleSearch} /> 
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
    </MovieListProvider>
  );
};

export default App;