import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.8);
  color: #B3B3B3;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(29, 185, 84, 0.2);
  font-size: 0.9rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  color: #B3B3B3;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #1DB954;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; {new Date().getFullYear()} DownSwift. All rights reserved.</p>
        <SocialLinks>
          <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</SocialLink>
          <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</SocialLink>
          <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;