import React from "react";
import styled, { keyframes } from "styled-components";

// Glitch Animation Keyframes
const glitchAnimation = keyframes`
  2%, 64% {
    transform: translate(2px, 0) skew(0deg);
  }
  4%, 60% {
    transform: translate(-2px, 0) skew(0deg);
  }
  62% {
    transform: translate(0, 0) skew(5deg); 
  }
`;

const backgroundAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(45deg, #121212, #1DB954, #191414);
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 15s ease infinite;
  color: #1DB954;
  padding: 15px 20px;
  position: sticky;
  top: 0;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1000;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color:rgb(62, 73, 57);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &::before,
  &::after {
    content: 'DownSwift';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 red;
    clip: rect(44px, 450px, 56px, 0);
    animation: ${glitchAnimation} 5s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 blue;
    clip: rect(44px, 450px, 56px, 0);
    animation: ${glitchAnimation} 5s infinite linear alternate-reverse;
    animation-delay: -2.5s;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

const NavLink = styled.li`
  position: relative;
  
  a {
    text-decoration: none;
    color: white;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 50%;
      background-color: #1DB954;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover {
      color: #1DB954;

      &::after {
        width: 100%;
      }
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>DownSwift</Logo>
      <NavLinks>
        <NavLink><a href="/">Home</a></NavLink>
        <NavLink><a href="#terms">Terms</a></NavLink>
        <NavLink><a href="#contact">Contact</a></NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;