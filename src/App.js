// App.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import logo from './assets/Movie.png'

const GlobalStyle = styled.div`
text-align: center;
  font-family: "Arial", sans-serif;
  h1 {
    color: var(--Pure-White, #fff);
    font-feature-settings: "clig" off, "liga" off;

    /* Heading (L) */
    font-family: Outfit;
    font-size: 32px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: -0.5px;
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
  }
`;

const SignupContainer = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 20px;
  background: var(--Semi-Dark-Blue, #161d2f);

  input {
    margin-top: 20px;
    width: 336px;
    height: 37px;
    margin-bottom: 10px;
    padding: 8px;
    background: transparent;
    border: none;
    color: var(--Pure-White, #fff);
    font-feature-settings: "clig" off, "liga" off;

    /* Body (M) */
    font-family: Outfit;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    border-bottom: 1px solid var(--Greyish-Blue, #5a698f);
  }

  button {
    width: 100%;
    padding: 10px;
    margin-top: 40px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 48px;
    flex-shrink: 0;
    border-radius: 6px;
    background: var(--Red, #fc4747);
    color: var(--Pure-White, #fff);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;

    /* Body (M) */
    font-family: Outfit;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    cursor: pointer;
  }

  p {
    margin: 10px 0;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  margin: 20px;
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
  overflow: hidden;
  white-space: nowrap;

  .trending-list {
    display: inline-block;
    animation: scrollAnimation 20s linear infinite;
  }

  @keyframes scrollAnimation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .trending-card {
    width: 200px;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: inline-block;
    vertical-align: top;

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

const TRENDING_API =
  "https://api.themoviedb.org/3/trending/all/day?api_key=04c35731a5ee918f014970082a0088b1";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [currentPage, setCurrentPage] = useState("movies");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(TRENDING_API);
        const data = await response.json();
        setTrending(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${SEARCH_API}${searchTerm}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleAddToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const handleAddToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const handleSignup = () => {
    if (userData.username && userData.password) {
      setIsRegistered(true);
    } else {
      alert("Please enter a username and password for registration.");
    }
  };

  const handleStartWithoutRegistration = () => {
    setIsLoggedIn(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "movies":
        return (
          <MovieList>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <button onClick={() => handleAddToFavorites(movie)}>
                  Add to Favorites
                </button>
                <button onClick={() => handleAddToWatchlist(movie)}>
                  Add to Watchlist
                </button>
              </div>
            ))}
          </MovieList>
        );

      case "favorites":
        return (
          <FavoritesContainer>
            <h2>Favorites</h2>
            {favorites.map((favorite) => (
              <div key={favorite.id} className="favorite-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`}
                  alt={favorite.title}
                />
                <h3>{favorite.title}</h3>
              </div>
            ))}
          </FavoritesContainer>
        );

      case "watchlist":
        return (
          <WatchlistContainer>
            <h2>Watchlist</h2>
            {watchlist.map((watchlistItem) => (
              <div key={watchlistItem.id} className="watchlist-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${watchlistItem.poster_path}`}
                  alt={watchlistItem.title}
                />
                <h3>{watchlistItem.title}</h3>
              </div>
            ))}
          </WatchlistContainer>
        );

      case "trending":
        return (
          <TrendingContainer>
            <div className="trending-list">
              {trending.map((trendingItem) => (
                <div key={trendingItem.id} className="trending-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${trendingItem.poster_path}`}
                    alt={trendingItem.title}
                  />
                  <h3>{trendingItem.title}</h3>
                </div>
              ))}
            </div>
          </TrendingContainer>
        );

      default:
        return (
          <MovieList>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <button onClick={() => handleAddToFavorites(movie)}>
                  Add to Favorites
                </button>
                <button onClick={() => handleAddToWatchlist(movie)}>
                  Add to Watchlist
                </button>
              </div>
            ))}
          </MovieList>
        );
    }
  };

  return (
    <GlobalStyle>
      <img src={logo} alt="MovieHub Logo" />
      {!isLoggedIn && !isRegistered && (
        <SignupContainer>
          <h1>Login</h1>
          <input
            placeholder="Email Address"
            type="text"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <input
            placeholder="Password"
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <button onClick={handleSignup}>Login to your account</button>
          <p>Or</p>
          <button onClick={handleStartWithoutRegistration}>
            Start Without Registration
          </button>
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

          {renderPage()}

          <div>
            <button onClick={() => setCurrentPage("movies")}>Movies</button>
            <button onClick={() => setCurrentPage("favorites")}>
              Favorites
            </button>
            <button onClick={() => setCurrentPage("watchlist")}>
              Watchlist
            </button>
            <button onClick={() => setCurrentPage("trending")}>Trending</button>
          </div>
        </AppContainer>
      )}
    </GlobalStyle>
  );
};

export default App;
