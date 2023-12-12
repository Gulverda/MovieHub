import React, { useRef, useState } from "react";
import styled from "styled-components";

const StyledTrendingContainer = styled.div`
  margin-top: 20px;
  overflow-x: hidden;

  .trending-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .trending-list {
    display: flex;
    transition: transform 0.5s ease;
  }

  .trending-card {
    width: 470px;
    margin-right: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 230px;
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

  .slider-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background-color: #ccc;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-button-left {
    left: 10px;
  }

  .slider-button-right {
    right: 10px;
  }
`;

const TrendingContainer = ({ trending }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const trendingListRef = useRef(null);
  const cardWidth = 470 + 20; // card width + margin-right

  const handleSlide = (direction) => {
    const containerWidth = trendingListRef.current.offsetWidth;

    if (direction === "left") {
      setScrollPosition((prevPosition) =>
        prevPosition - containerWidth < 0 ? 0 : prevPosition - containerWidth
      );
    } else if (direction === "right") {
      setScrollPosition((prevPosition) =>
        prevPosition + containerWidth >= cardWidth * trending.length
          ? prevPosition
          : prevPosition + containerWidth
      );
    }
  };

  return (
    <StyledTrendingContainer>
      <div className="trending-container">
        <h2>Trending</h2>
        <button
          className="slider-button slider-button-left"
          onClick={() => handleSlide("left")}
        >
          {"<"}
        </button>
        <div
          className="trending-list"
          style={{ transform: `translateX(${-scrollPosition}px)` }}
          ref={trendingListRef}
        >
          {trending.map((item) => (
            <div key={item.title} className="trending-card">
              <img src={item.thumbnail.regular.small} alt={item.title} />
              <div className="trending-details">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <button
          className="slider-button slider-button-right"
          onClick={() => handleSlide("right")}
        >
          {">"}
        </button>
      </div>
    </StyledTrendingContainer>
  );
};

export default TrendingContainer;
