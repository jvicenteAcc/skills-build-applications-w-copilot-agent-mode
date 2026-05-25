import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUrl = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', port, mongoUrl });
});

app.listen(port, async () => {
  console.log(`OctoFit Tracker backend running on http://localhost:${port}`);

  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB on port 27017');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
});
