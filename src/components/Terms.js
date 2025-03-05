import React from "react";
import styled from "styled-components";

const TermsContainer = styled.div`
  background: linear-gradient(to right, #121212, #191414);
  color: white;
  min-height: 100vh;
  padding: 40px 20px;
`;

const TermsContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.6);
  padding: 40px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  color: #1DB954;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const SectionTitle = styled.h3`
  color: #1DB954;
  margin-top: 25px;
  border-bottom: 2px solid #1DB954;
  padding-bottom: 10px;
`;

const TextContent = styled.p`
  line-height: 1.6;
  color: #B3B3B3;
  margin-bottom: 20px;
`;

const TermsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TermsListItem = styled.li`
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  position: relative;
  padding-left: 40px;

  &::before {
    content: '•';
    position: absolute;
    left: 15px;
    color: #1DB954;
    font-size: 1.5rem;
  }
`;

const LastUpdated = styled.p`
  text-align: center;
  color: #B3B3B3;
  margin-top: 30px;
  font-style: italic;
`;

const Terms = () => {
  return (
    <TermsContainer>
      <TermsContent>
        <Title>Terms and Conditions</Title>
        
        <SectionTitle>1. Introduction</SectionTitle>
        <TextContent>
          Welcome to DownSwift, a YouTube video and audio downloader service. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully.
        </TextContent>

        <SectionTitle>2. User Eligibility</SectionTitle>
        <TermsList>
          <TermsListItem>You must be at least 18 years old to use this service.</TermsListItem>
          <TermsListItem>You must have legal capacity to enter into agreements.</TermsListItem>
          <TermsListItem>You must be accessing the service from a jurisdiction where it is legal.</TermsListItem>
        </TermsList>

        <SectionTitle>3. Service Usage</SectionTitle>
        <TermsList>
          <TermsListItem>This service is intended for personal, non-commercial use only.</TermsListItem>
          <TermsListItem>You may not use this service to download copyrighted content without permission.</TermsListItem>
          <TermsListItem>We do not host or store downloaded content on our servers.</TermsListItem>
          <TermsListItem>Each download is processed in real-time through third-party APIs.</TermsListItem>
        </TermsList>

        <SectionTitle>4. Copyright and Intellectual Property</SectionTitle>
        <TextContent>
          We respect copyright laws and expect our users to do the same. Downloading content without proper authorization may constitute copyright infringement.
        </TextContent>
        <TermsList>
          <TermsListItem>Do not download content you do not have the right to use.</TermsListItem>
          <TermsListItem>Respect the intellectual property rights of content creators.</TermsListItem>
          <TermsListItem>We are not responsible for users' copyright violations.</TermsListItem>
        </TermsList>

        <SectionTitle>5. User Responsibilities</SectionTitle>
        <TermsList>
          <TermsListItem>You are solely responsible for your downloads and usage of content.</TermsListItem>
          <TermsListItem>Do not use the service for illegal or unethical purposes.</TermsListItem>
          <TermsListItem>Protect your account credentials and do not share them.</TermsListItem>
        </TermsList>

        <SectionTitle>6. Limitation of Liability</SectionTitle>
        <TextContent>
          DownSwift provides this service "as is" and cannot be held liable for any damages arising from its use. We do not guarantee the availability, accuracy, or reliability of downloads.
        </TextContent>

        <SectionTitle>7. Privacy</SectionTitle>
        <TextContent>
          We respect your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your information.
        </TextContent>

        <SectionTitle>8. Changes to Terms</SectionTitle>
        <TextContent>
          We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of new terms.
        </TextContent>

        <LastUpdated>Last Updated: March 2024</LastUpdated>
      </TermsContent>
    </TermsContainer>
  );
};

export default Terms;