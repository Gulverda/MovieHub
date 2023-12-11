// MovieList.js

import React from "react";
import styled from "styled-components";
import fav from "../assets/fav.svg"

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieCard = styled.div`
  position: relative;
  margin: 10px;
  text-align: center;
  
  button{
    position: absolute;
    margin-left: -45px;
    margin-top: 16px;
    background: transparent;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    border: none;
    cursor: pointer;
    opacity: 0.56;
  }

  button:hover{
    opacity: 1;
    background: white;
  }
`;

const MovieImage = styled.img`
  width: 280px;  // Adjust the size as needed
  height: 174px;  // Adjust the size as needed
  border-radius: 8px;
`;

const PlaceholderImage = styled.div`
  width: 150px;  // Adjust the size as needed
  height: 225px;  // Adjust the size as needed
  background-color: #ccc;
`;


const MovieList = ({ movies, handleAddToFavorites, handleAddToWatchlist }) => {
  return (
    <MovieListContainer>
      {movies.map((movie, index) => {
        console.log("Movie data:", movie); // Log movie data
        return (
          <MovieCard key={index}>
            {movie.thumbnail ? (
              <MovieImage
                src={movie.thumbnail.trending ? movie.thumbnail.trending.small : movie.thumbnail.regular.small}
                alt={movie.title}
              />
            ) : (
              <PlaceholderImage />
              
            )}<button onClick={() => handleAddToFavorites(movie)}>
            <img src={fav} alt="Favorite Icon" />
            </button>
            
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <p>{movie.category}</p>
            <p>{movie.rating}</p>
            <button onClick={() => handleAddToWatchlist(movie)}>
              Add to Watchlist
            </button>
          </MovieCard>
        );
      })}
    </MovieListContainer>
  );
};

export default MovieList;
