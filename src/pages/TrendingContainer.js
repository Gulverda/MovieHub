import React from "react";
import styled from "styled-components";

const StyledTrendingContainer = styled.div`
  margin-top: 20px;
  overflow-x: hidden;

  .trending-list {
    display: flex;
    overflow-x: hidden;
    animation: scrollAnimation 20s linear infinite;
  }
  
  .trending-container {
    overflow: hidden;
    position: relative;
    width: 100%; /* Adjust as needed */
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
    margin-right: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .trending-details {
      padding: 15px;
      background-color: #fff;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;

      h3 {
        margin-top: 10px;
        font-size: 1.2em;
        color: #333;
      }
    }
  }
`;

const TrendingContainer = ({ trending }) => {
  return (
    <StyledTrendingContainer>
      <div className="trending-container">
        <h2>Trending</h2>
        <div className="trending-list">
          {trending.map((movie) => (
            <div key={movie.id} className="trending-card">
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="trending-details">
                <h3>{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledTrendingContainer>
  );
};

export default TrendingContainer;
