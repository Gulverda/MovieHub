// App.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const GlobalStyle = styled.div`
  font-family: 'Arial', sans-serif;
`;

const SignupContainer = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  p {
    margin: 10px 0;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  margin: 20px;

  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;

  input {
    padding: 8px;
  }

  button {
    margin-left: 10px;
    padding: 8px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .movie-card {
    width: 300px;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    img {
      width: 100%;
      border-radius: 5px;
    }

    h2 {
      margin-top: 10px;
      font-size: 1.2em;
    }

    p {
      margin-top: 10px;
    }

    button {
      margin-top: 10px;
      padding: 8px;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const FavoritesContainer = styled.div`
  margin-top: 20px;

  .favorite-card {
    width: 200px;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    img {
      width: 100%;
      border-radius: 5px;
    }

    h3 {
      margin-top: 10px;
      font-size: 1.2em;
    }
  }
`;

const WatchlistContainer = styled.div`
  margin-top: 20px;

  .watchlist-card {
    width: 200px;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    img {
      width: 100%;
      border-radius: 5px;
    }

    h3 {
      margin-top: 10px;
      font-size: 1.2em;
    }
  }
`;

const TrendingContainer = styled.div`
  margin-top: 20px;

  .trending-card {
    width: 200px;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    img {
      width: 100%;
      border-radius: 5px;
    }

    h3 {
      margin-top: 10px;
      font-size: 1.2em;
    }
  }
`;

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${SEARCH_API}${searchTerm}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleAddToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const handleAddToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const handleLogin = () => {
    if (userData.username === 'yourUsername' && userData.password === 'yourPassword') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleSignup = () => {
    if (userData.username && userData.password) {
      setIsRegistered(true);
    } else {
      alert('Please enter a username and password for registration.');
    }
  };

  const handleStartWithoutRegistration = () => {
    setIsLoggedIn(true);
  };

  return (
    <GlobalStyle>
      {(!isLoggedIn && !isRegistered) && (
        <SignupContainer>
          <h1>Sign Up for MovieHub</h1>
          <label>Username:</label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          <label>Password:</label>
          <input
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <button onClick={handleSignup}>Sign Up</button>
          <p>Or</p>
          <button onClick={handleStartWithoutRegistration}>Start Without Registration</button>
        </SignupContainer>
      )}

      {(isLoggedIn || isRegistered) && (
        <AppContainer>
          <h1>MovieHub</h1>
          <SearchContainer>
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </SearchContainer>

          <MovieList>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <button onClick={() => handleAddToFavorites(movie)}>Add to Favorites</button>
                <button onClick={() => handleAddToWatchlist(movie)}>Add to Watchlist</button>
              </div>
            ))}
          </MovieList>

          <FavoritesContainer>
            <h2>Favorites</h2>
            {favorites.map((favorite) => (
              <div key={favorite.id} className="favorite-card">
                <img src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`} alt={favorite.title} />
                <h3>{favorite.title}</h3>
              </div>
            ))}
          </FavoritesContainer>

          <WatchlistContainer>
            <h2>Watchlist</h2>
            {watchlist.map((watchlistItem) => (
              <div key={watchlistItem.id} className="watchlist-card">
                <img src={`https://image.tmdb.org/t/p/w500/${watchlistItem.poster_path}`} alt={watchlistItem.title} />
                <h3>{watchlistItem.title}</h3>
              </div>
            ))}
          </WatchlistContainer>

          <TrendingContainer>
            <h2>Trending</h2>
            {trending.map((trendingItem) => (
              <div key={trendingItem.id} className="trending-card">
                <img src={`https://image.tmdb.org/t/p/w500/${trendingItem.poster_path}`} alt={trendingItem.title} />
                <h3>{trendingItem.title}</h3>
              </div>
            ))}
          </TrendingContainer>
        </AppContainer>
      )}
    </GlobalStyle>
  );
};

export default App;
