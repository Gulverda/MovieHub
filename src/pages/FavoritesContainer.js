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
        {favorites.map((item) => (
          <li key={item.title} className="favorite-card">
            <h3>{item.title}</h3>
            <img src={item.thumbnail.regular.small} alt={item.title} />
          </li>
        ))}
      </ul>
    </StyledFavoritesContainer>
  );
};

export default FavoritesContainer;
