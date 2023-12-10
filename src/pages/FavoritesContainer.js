// FavoritesContainer.js
import React from "react";
import styled from "styled-components";

const StyledFavoritesContainer = styled.div`
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

const FavoritesContainer = ({ favorites }) => {
  return (
    <StyledFavoritesContainer>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((movie) => (
          <li key={movie.id}>{movie.title}
          <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
              />
          </li>
        ))}
      </ul>
    </StyledFavoritesContainer>
  );
};

export default FavoritesContainer;
