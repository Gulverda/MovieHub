// Sidebar.js
import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import logo from "./assets/Movie.png";

const SidebarContainer = styled.div`
  height: 100vh;
  width: 80px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--Semi-Dark-Blue, #161d2f);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  z-index: 1;

  a {
    text-decoration: none;
    color: var(--Pure-White, #fff);
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      color: #4caf50;
    }
  }

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 20px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Link to="/">
        <img src={logo} alt="Head Icon" />
      </Link>
      <Link to="/">
        <span>Home</span>
      </Link>
      <Link to="/favorites">
        <span>Favorites</span>
      </Link>
      <Link to="/watchlist">
        <span>Watchlist</span>
      </Link>
      <Link to="/tv-series">
        <span>TV Series</span>
      </Link>
      {/* Add more links as needed */}
    </SidebarContainer>
  );
};

export default Sidebar;
