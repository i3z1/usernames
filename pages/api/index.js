// pages/api/usernames/index.js
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'usernames.json');
const API_KEY = 'i3zontop';

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = readData();
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    // Check API key in header
    const key = req.headers['x-api-key'];
    if (!key || key !== API_KEY) {
      return res.status(403).json({ error: 'Forbidden. Invalid API key.' });
    }

    const { username, price } = req.body;
    if (!username || price == null || isNaN(price)) {
      return res.status(400).json({ error: 'Invalid username or price' });
    }
    const data = readData();
    const newEntry = { id: Date.now().toString(), username, price };
    data.push(newEntry);
    writeData(data);
    return res.status(201).json(newEntry);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
