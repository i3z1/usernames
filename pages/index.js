// pages/index.js
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    // Fetch the usernames from the API
    fetch('/api/usernames')
      .then((res) => res.json())
      .then((data) => setUsernames(data))
      .catch((err) => console.error('Error fetching usernames:', err));
  }, []);

  useEffect(() => {
    // Initialize Vanta.js once the component mounts
    if (typeof window !== 'undefined' && window.VANTA) {
      window.VANTA.NET({
        el: "#vanta-bg",
        color: 0x00a8cc,
        backgroundColor: 0x000000,
        points: 15.0,
        maxDistance: 20.0,
        mouseControls: true,
        touchControls: true,
        gyroControls: false
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Username Store</title>
        <meta name="description" content="Amazing deals on premium usernames" />
        {/* Load Three.js and Vanta.js via CDN */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js" />
      </Head>

      {/* Vanta Background Container */}
      <div id="vanta-bg"></div>

      {/* Header */}
      <header className="site-header">
        <div className="container">
          <h1>Username Store</h1>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Deals</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>Find Your Perfect Username</h2>
          <p>Amazing deals on premium usernames</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        <div className="grid">
          {usernames.map((item) => (
            <div className="username-entry" key={item.id}>
              <h2>{item.username}</h2>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <p>&copy; 2023 Username Store. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
