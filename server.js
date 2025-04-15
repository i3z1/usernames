// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies for API requests
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static('public'));

// Path to the JSON data file
const DATA_FILE = path.join(__dirname, 'usernames.json');

// API key (for POST/DELETE modifications)
const API_KEY = 'i3zontop';

// Helper function: read usernames.json
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data file:', err);
    return [];
  }
}

// Helper function: write data to usernames.json
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data file:', err);
  }
}

// Public GET endpoint – returns the list of usernames and prices
app.get('/api/usernames', (req, res) => {
  const data = readData();
  res.json(data);
});

// Middleware to check API key in request headers for modifying routes
function checkApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== API_KEY) {
    return res.status(403).json({ error: 'Forbidden. Invalid API key.' });
  }
  next();
}

// Protected POST endpoint – add a new username entry
app.post('/api/usernames', checkApiKey, (req, res) => {
  const { username, price } = req.body;
  if (!username || price == null || isNaN(price)) {
    return res.status(400).json({ error: 'Invalid username or price' });
  }
  const data = readData();
  const newEntry = { id: Date.now().toString(), username, price };
  data.push(newEntry);
  writeData(data);
  res.status(201).json(newEntry);
});

// Protected DELETE endpoint – remove an entry by id
app.delete('/api/usernames/:id', checkApiKey, (req, res) => {
  const id = req.params.id;
  const data = readData();
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Entry not found' });
  }
  data.splice(index, 1);
  writeData(data);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
