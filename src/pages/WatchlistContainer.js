// WatchlistContainer.js
import React from "react";
import styled from "styled-components";

const StyledWatchlistContainer = styled.div`
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

const WatchlistContainer = ({ watchlist }) => {
  return (
    <StyledWatchlistContainer>
    <div>
      <h2>Watchlist</h2>
      <ul>
        {watchlist.map((movie) => (
          <li key={movie.id}>{movie.title}
          <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
              />
          </li>
        ))}
      </ul>
    </div>
    </StyledWatchlistContainer>
  );
};

export default WatchlistContainer;
