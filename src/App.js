import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Terms from "./components/Terms";
import Footer from "./components/Footer";
import styled, { keyframes } from "styled-components";

// Background Animation Keyframes
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Spotify-inspired Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #121212, #1DB954, #191414);
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 15s ease infinite;
  font-family: 'Spotify', Arial, sans-serif;
  padding: 20px;
`;

const DownloaderCard = styled.div`
  background: rgba(0, 0, 0, 0.85);
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  color: #1DB954;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border: 2px solid #1DB954;
    box-shadow: 0 0 10px rgba(29, 185, 84, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  background: #282828;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(29, 185, 84, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1DB954;
  color: black;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulseAnimation} 2s infinite;

  &:hover {
    background-color: #1ED760;
    transform: scale(1.02);
  }

  &:disabled {
    background-color: #535353;
    cursor: not-allowed;
    animation: none;
    color: #b3b3b3;
  }
`;

const ErrorMessage = styled.p`
  color: #FF5E5E;
  text-align: center;
  margin-top: 20px;
`;

const DownloadLink = styled.a`
  display: block;
  text-align: center;
  color: #1DB954;
  margin-top: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #1ED760;
    text-decoration: underline;
  }
`;

const Loader = styled.div`
  width: 80px;
  height: 10px;
  background: #282828;
  border-radius: 40px;
  overflow: hidden;
  margin: 20px auto;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: #1DB954;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    0% { width: 0; left: 0; }
    50% { width: 100%; left: 0; }
    100% { width: 0; left: 100%; }
  }
`;

function App() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("video");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter a valid YouTube URL.");
      return;
    }
  
    setLoading(true);
    setError("");
    setDownloadLink("");
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/download/", { url, format }, { responseType: 'blob' });
  
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `download.${format === "audio_mp3" ? "mp3" : format === "audio_mp4" ? "mp4" : "mp4"}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch download link. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
    <Navbar/>
    <AppContainer>
      <DownloaderCard>
        <Title>YouTube Downloader</Title>
        <InputField type="text" placeholder="Paste YouTube URL here" value={url} onChange={(e) => setUrl(e.target.value)} />
        <Select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="video">Video (MP4)</option>
          <option value="audio_mp4">Audio (MP4)</option>
          <option value="audio_mp3">Audio (MP3)</option>
        </Select>
        <Button onClick={handleDownload} disabled={loading}>{loading ? "Processing..." : "Get Download Link"}</Button>
        {loading && <Loader />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {downloadLink && <DownloadLink href={downloadLink} download>Click here to download</DownloadLink>}
      </DownloaderCard>
    </AppContainer>
    <Terms/>
    <Footer/>
    </>
  );
}

export default App;