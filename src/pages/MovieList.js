// MovieList.js
import React from "react";
import styled from "styled-components";

const StyledMovieList = styled.div`
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

const MovieList = ({ movies, handleAddToFavorites, handleAddToWatchlist }) => {
  return (
    <StyledMovieList>
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
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
    </StyledMovieList>
  );
};

export default MovieList;
