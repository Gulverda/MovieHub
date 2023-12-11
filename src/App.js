import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Updated import
import styled from "styled-components";
import "./App.css";
import logo from "./assets/Movie.png";
import MovieList from "./pages/MovieList";
import fav from "./assets/fav.svg";
import FavoritesContainer from "./pages/FavoritesContainer";
import WatchlistContainer from "./pages/WatchlistContainer";
import TrendingContainer from "./pages/TrendingContainer";
import data from "./Data.json"

const GlobalStyle = styled.div`
  text-align: center;
  font-family: "Arial", sans-serif;
  overflow-x: hidden;
  h1 {
    color: var(--Pure-White, #fff);
    font-feature-settings: "clig" off, "liga" off;
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

  useEffect(() => {
    setMovies(data.results);
  }, []);

  useEffect(() => {
    setTrending(data.results.filter(movie => movie.isTrending));
  }, []);

  const handleSearch = async () => {
    // Your search logic here
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

  return (
    <Router>
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

         <div>
           <Link to="/movies">
             <button>Movies</button>
           </Link>
           <Link to="/favorites">
             <button><img src={fav} alt="Favorite Icon" /></button>
           </Link>
           <Link to="/watchlist">
             <button>Watchlist</button>
           </Link>
           <Link to="/trending">
             <button>Trending</button>
           </Link>
         </div>

         <Routes>
           <Route
             path="/movies"
             element={
               <div>
                 <MovieList
                   movies={movies}
                   handleAddToFavorites={handleAddToFavorites}
                   handleAddToWatchlist={handleAddToWatchlist}
                 />
                 <Link to="/favorites">
                   <button><img src={fav} alt="Favorite Icon" /></button>
                 </Link>
                 <Link to="/watchlist">
                   <button>Go to Watchlist</button>
                 </Link>
                 <Link to="/trending">
                   <button>Go to Trending</button>
                 </Link>
               </div>
             }
           />
           <Route
             path="/favorites"
             element={
               <FavoritesContainer favorites={favorites} />
             }
           />
           <Route
             path="/watchlist"
             element={
               <WatchlistContainer watchlist={watchlist} />
             }
           />
           <Route
             path="/trending"
             element={
               <TrendingContainer trending={trending} />
             }
           />
         </Routes>
       </AppContainer>
        )}
      </GlobalStyle>
    </Router>
  );
};

export default App;
