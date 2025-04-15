// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Vanta.js Net effect
  VANTA.NET({
    el: "#vanta-bg",
    color: 0x00a8cc,           // Accent color for nodes/lines (adjust as desired)
    backgroundColor: 0x000000,  // Black background for dark mode
    points: 15.0,              // Adjust to control point density
    maxDistance: 20.0,         // Distance threshold for connecting lines
    mouseControls: true,
    touchControls: true,
    gyroControls: false
  });

  const listContainer = document.getElementById('usernames-list');

  // Fetch username data from the API
  fetch('/api/usernames')
    .then(response => response.json())
    .then(data => {
      listContainer.innerHTML = '';
      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('username-entry');
        card.innerHTML = `
          <h2>${item.username}</h2>
          <p>Price: $${item.price}</p>
        `;
        listContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching usernames:', error);
      listContainer.innerHTML = '<p>Failed to load data.</p>';
    });
});
