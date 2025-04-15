// script.js

// Initialize Vanta.js with the NET effect on the #vanta-bg element
VANTA.NET({
  el: "#vanta-bg",
  color: 0x00a8cc,           // Accent color for nodes and lines
  backgroundColor: 0x000000,  // Use a pure black background for dark mode
  points: 15.0,              // Controls the density of points
  maxDistance: 20.0,         // Maximum distance for connecting lines
  mouseControls: true,
  touchControls: true,
  gyroControls: false
});
