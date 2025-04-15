// pages/api/usernames/[id].js
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
  if (req.method === 'DELETE') {
    // Check API key
    const key = req.headers['x-api-key'];
    if (!key || key !== API_KEY) {
      return res.status(403).json({ error: 'Forbidden. Invalid API key.' });
    }

    const { id } = req.query;
    const data = readData();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    data.splice(index, 1);
    writeData(data);
    return res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
