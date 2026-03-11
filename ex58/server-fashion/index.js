/**
 * Exercise 58 - server-fashion
 * REST API for FashionData.Fashion
 * Port: 4000
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 4000;
const MONGO_URI = 'mongodb://127.0.0.1:27017';

app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({ origin: true }));

let fashionCollection;

// Connect MongoDB
async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  fashionCollection = client.db('FashionData').collection('Fashion');
  console.log('MongoDB connected');
}

// Get All Fashion - sorted by creation date desc
app.get('/api/fashions', async (req, res) => {
  try {
    const list = await fashionCollection.find({}).sort({ creationDate: -1 }).toArray();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Filter Fashion by Style
app.get('/api/fashions/style/:style', async (req, res) => {
  try {
    const style = decodeURIComponent(req.params.style);
    const list = await fashionCollection.find({ style: style }).sort({ creationDate: -1 }).toArray();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Fashion by ID
app.get('/api/fashions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });
    const item = await fashionCollection.findOne({ _id: new ObjectId(id) });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add New Fashion
app.post('/api/fashions', async (req, res) => {
  try {
    const { title, details, thumbnail, style } = req.body;
    if (!title || !style) return res.status(400).json({ message: 'title and style required' });
    const doc = {
      title: title.trim(),
      details: details || '',
      thumbnail: thumbnail || '',
      style: style.trim(),
      creationDate: new Date()
    };
    const result = await fashionCollection.insertOne(doc);
    res.status(201).json({ _id: result.insertedId, ...doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit Fashion
app.put('/api/fashions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });
    const { title, details, thumbnail, style } = req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (details !== undefined) update.details = details;
    if (thumbnail !== undefined) update.thumbnail = thumbnail;
    if (style !== undefined) update.style = style;
    const result = await fashionCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Fashion
app.delete('/api/fashions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });
    const result = await fashionCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => res.send('server-fashion - Exercise 58 API'));

connectDB().then(() => {
  app.listen(PORT, () => console.log(`server-fashion listening on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connect failed:', err);
  process.exit(1);
});
