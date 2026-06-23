import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.models.js';

const app = express();
app.use(express.json());

const MONGO_URI = 'mongodb://127.0.0.1:20017/swiftdrop'; 
const PORT = 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    
    app.listen(PORT, () => {
      console.log(`Server is running smoothly on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
  });